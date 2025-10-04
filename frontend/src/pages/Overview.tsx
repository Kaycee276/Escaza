import { motion } from "framer-motion";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../common/SearchBar";
import FilterBtn from "../common/FilterBtn";
import NotificationBtn from "../common/NotificationBtn";

import ProgressSummary from "../components/dashboard/ProgressSummary";
import StatsCards from "../components/dashboard/StatsCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import WeeklyGoal from "../components/dashboard/WeeklyGoal";
// import AIAssistant from "../components/dashboard/AIAssistant";
import Achievements from "../components/dashboard/Achievements";

import type { DashboardData } from "../store/dashboardStore";

import getTimeOfDay from "../utils/getTimeOfDay";

interface OverviewProps {
	progress: number;
	dashboardData: DashboardData;
	userName: string;
	weeklyStreak: number;
}

const Overview: React.FC<OverviewProps> = ({
	progress,
	dashboardData,
	userName,
	weeklyStreak,
}) => {
	const navigate = useNavigate();
	const [filter, setFilter] = useState<string>("all");

	return (
		<main className="flex-1 p-4 md:p-8">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
			>
				<div>
					<h1 className="text-3xl font-bold  mb-2">
						Good {getTimeOfDay()}, {userName.split(" ")[0]}!
					</h1>
					<p className="text-[var(--text-secondary)]">
						Ready to continue your IT journey?
					</p>
				</div>
				<div className="flex items-center space-x-4 w-full md:max-autofit">
					<SearchBar filter={filter} />
					<FilterBtn setFilter={setFilter} filter={filter} />
					<NotificationBtn />
				</div>
			</motion.div>
			{/* Progress Summary (mobile) */}
			<div className="block lg:hidden mb-4">
				<ProgressSummary
					totalEntries={dashboardData.totalEntries}
					totalDays={dashboardData.totalDays}
					progress={progress}
				/>
			</div>
			{/* Stats Cards */}
			<StatsCards dashboardData={dashboardData} progress={progress} />
			{/* Main Content Area */}
			<div className="grid md:grid-cols-[2fr_1fr] lg:grid-cols-3 gap-8 mb-16">
				{/* Recent Activity */}
				<RecentActivity recentEntries={dashboardData.recentEntries} />
				{/* Right Sidebar */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.5 }}
					className="space-y-6 "
					// md:max-h-[calc(100vh-10rem)] scrollbar-hide overflow-y-auto pr-2
				>
					<QuickActions onNewEntry={() => navigate("/dashboard/entries/new")} />
					<WeeklyGoal weeklyStreak={weeklyStreak} />
					{/* <AIAssistant aiReadyIn={dashboardData.aiReadyIn} /> */}
					<Achievements />
				</motion.div>
			</div>
		</main>
	);
};

export default Overview;
