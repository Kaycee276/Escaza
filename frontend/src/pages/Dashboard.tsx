import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Loader from "../common/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

import { useDashboardStore } from "../store/dashboardStore";
import { useUserStore } from "../store/userStore";
import { useToastStore } from "../store/toastStore";

// import { listEntries } from "../api/entries";
// import type { Entry } from "../api/entries";
// import { fetchUser } from "../api/FetchUser";

import { useEntries } from "../hooks/useEntries";

import Overview from "./Overview";
import Entries from "./Entries";
import Calender from "./Calender";
import Analytics from "./Analytics";
import AITools from "./AITools";
import Page404 from "./404";

import EntryPreview from "./EntryPreview";

import { BarChart3, FileText, Calendar, TrendingUp, Brain } from "lucide-react";

const sidebarItems = [
	{ id: "overview", label: "Overview", icon: BarChart3, path: "/dashboard" },
	{
		id: "entries",
		label: "Entries",
		icon: FileText,
		path: "/dashboard/entries",
	},
	{
		id: "calender",
		label: "Calender",
		icon: Calendar,
		path: "/dashboard/calender",
	},
	{
		id: "analytics",
		label: "Analytics",
		icon: TrendingUp,
		path: "/dashboard/analytics",
	},
	{
		id: "ai-tools",
		label: "AI Tools",
		icon: Brain,
		path: "/dashboard/ai-tools",
	},
];

const Dashboard = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const showToast = useToastStore((state) => state.showToast);

	const { dashboardData, setDashboardData, activeTab, setActiveTab } =
		useDashboardStore();
	const user = useUserStore((state) => state.user);
	const loading = !user || !dashboardData;
	const { entries } = useEntries();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/signin");
			return;
		}

		const populateDashboard = async () => {
			try {
				// Use existing entries to populate dashboard widgets
				const recentEntries =
					entries.length > 0
						? entries
								.sort(
									(a, b) =>
										new Date(b.created_at).getTime() -
										new Date(a.created_at).getTime()
								)
								.slice(0, 3)
								.map((entry) => ({
									id: entry.id,
									date: new Date(entry.created_at).toISOString().split("T")[0],
									title: entry.title,
									preview:
										entry.content.length > 100
											? entry.content.slice(0, 100) + "..."
											: entry.content,
									wordCount: entry.content.split(" ").length,
									status: entry.status,
								}))
						: [];

				const weeklyStreak =
					entries.length > 0
						? entries.reduce((streak, entry) => {
								const entryDate = new Date(entry.created_at);
								const now = new Date();
								const diffTime = Math.abs(now.getTime() - entryDate.getTime());
								const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
								if (diffDays <= 7 && entry.status === "completed") {
									return streak + 1;
								}
								return streak;
						  }, 0)
						: 0;

				setDashboardData({
					totalEntries: entries.length,
					totalDays: 180,
					aiReadyIn: 30,
					weeklyStreak: weeklyStreak,
					recentEntries: recentEntries,
					entries: entries,
				});
			} catch (error) {
				console.error("Error fetching user data:", error);
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				showToast("Session expired. Please sign in again.", "error");
				setDashboardData(null);
				navigate("/signin");
			}
		};

		populateDashboard();

		// eslint-disable-next-line
	}, [navigate, entries]);

	// Keep activeTab in sync with current route
	useEffect(() => {
		const path = location.pathname;
		if (path.startsWith("/dashboard/entries")) setActiveTab("entries");
		else if (path.startsWith("/dashboard/calender")) setActiveTab("calender");
		else if (path.startsWith("/dashboard/analytics")) setActiveTab("analytics");
		else if (path.startsWith("/dashboard/ai-tools")) setActiveTab("ai-tools");
		else if (path.startsWith("/dashboard")) setActiveTab("overview");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	if (loading) {
		return <Loader />;
	}
	if (!user || !dashboardData) {
		return null;
	}

	let progress = 0;

	if (dashboardData.totalEntries > 0 && dashboardData.totalDays > 0) {
		progress = (dashboardData.totalEntries / dashboardData.totalDays) * 100;
	}

	return (
		<div className="min-h-screen ">
			<Navbar />
			<div className="flex">
				<Sidebar
					user={user}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					sidebarItems={sidebarItems}
					totalEntries={dashboardData.totalEntries}
					totalDays={dashboardData.totalDays}
					progress={progress}
				/>

				<Routes>
					<Route
						path="/"
						element={
							<Overview
								progress={progress}
								dashboardData={dashboardData}
								userName={user.name}
								weeklyStreak={dashboardData.weeklyStreak}
							/>
						}
					/>
					<Route path="/entries" element={<Entries />} />
					<Route path="/entries/new" element={<Entries />} />
					<Route path="/entries/:id" element={<EntryPreview />} />
					<Route path="/calender" element={<Calender />} />
					<Route path="/analytics" element={<Analytics />} />
					<Route path="/ai-tools" element={<AITools />} />
					<Route path="*" element={<Page404 />} />
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
