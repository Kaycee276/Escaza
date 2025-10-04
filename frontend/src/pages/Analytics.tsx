import { useMemo } from "react";
import { useEntries } from "../hooks/useEntries";
import MiniLoader from "../common/MiniLoader";
import { formatDateForInput } from "../utils/formatDate";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
	ResponsiveContainer,
	Legend,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b"];

const Analytics = () => {
	const { entries, loading, error } = useEntries();

	const entriesPerDay = useMemo(() => {
		const map: Record<string, number> = {};
		entries.forEach((e) => {
			const day = formatDateForInput(e.created_at);
			map[day] = (map[day] || 0) + 1;
		});
		return Object.entries(map).map(([day, count]) => ({
			day,
			count,
		}));
	}, [entries]);

	const statusDistribution = useMemo(() => {
		const map: Record<string, number> = { completed: 0, draft: 0 };
		entries.forEach((e) => {
			map[e.status] += 1;
		});
		return Object.entries(map).map(([status, value]) => ({
			name: status,
			value,
		}));
	}, [entries]);

	const activityOverTime = useMemo(() => {
		const map: Record<string, number> = {};
		entries.forEach((e) => {
			const day = formatDateForInput(e.created_at);
			map[day] = (map[day] || 0) + 1;
		});
		return Object.entries(map).map(([day, count]) => ({
			day,
			count,
		}));
	}, [entries]);

	if (loading)
		return (
			<div className="flex-1 p-4 md:p-12 w-full flex items-center justify-center">
				<MiniLoader />
			</div>
		);
	if (error) return <p className="text-[var(--error)]">Error loading data.</p>;

	return (
		<div className="flex-1 p-4 md:p-8 w-full space-y-8 pb-28 md:pb-32">
			<h1 className="text-2xl font-bold mb-4">Analytics</h1>
			<p className="text-[var(--text-secondary)]">
				View detailed analytics and insights about your entries here.
			</p>

			<div className="w-full h-72">
				<h2 className="text-xl font-semibold mb-2">Entries Per Day</h2>
				<div className=" w-full h-60 wrapper-container outline-none focus:outline-none">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={entriesPerDay}>
							{/* <CartesianGrid strokeDasharray="" /> */}
							<XAxis
								dataKey="day"
								tick={{ fontSize: 12 }}
								label={{ value: "Date", position: "insideBottom", dy: 10 }}
							/>
							<YAxis
								label={{
									value: "No of Entries",
									angle: -90,
									position: "insideLeft",
								}}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#1e293b",
									color: "#fff",
									borderRadius: "8px",
									border: "none",
								}}
							/>
							<Bar
								dataKey="count"
								barSize={50}
								fill="#f57c20"
								isAnimationActive={true}
								animationDuration={1000}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Status Distribution - Pie Chart */}
			<div className="w-full h-72">
				<h2 className="text-xl font-semibold mb-2">
					Entry Status Distribution
				</h2>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={statusDistribution}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							innerRadius={30}
							outerRadius={100}
							label
						>
							{statusDistribution.map((_, index) => (
								<Cell key={index} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Activity Over Time - Line Chart */}
			<div className="w-full h-72">
				<h2 className="text-xl font-semibold mb-2">Activity Over Time</h2>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={activityOverTime}>
						{/* <CartesianGrid strokeDasharray="3 3" /> */}
						<XAxis dataKey="day" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="count"
							stroke="#1d4ed8"
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default Analytics;
