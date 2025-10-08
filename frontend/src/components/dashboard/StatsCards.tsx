import { FileText, Target, Brain, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import formatNumber from "../../utils/formatNumber";
import type { Entry } from "../../api/entries";

interface StatsCardsProps {
	dashboardData: {
		totalEntries: number;
		aiReadyIn: number;
		weeklyStreak: number;
		entries: Entry[];
	};
	progress: number;
}

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const StatsCards: React.FC<StatsCardsProps> = ({ dashboardData, progress }) => {
	const [showCompleted, setShowCompleted] = useState(false);
	const completedEntriesCount = dashboardData.entries.filter(
		(entry) => entry.status === "completed"
	).length;

	return (
		<motion.div
			className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
			variants={container}
			initial="hidden"
			animate="show"
		>
			{/* Stacked Cards Container */}
			<div className="relative min-h-[180px]">
				{/* Back Card */}
				<motion.div
					className={`absolute inset-0 rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-all cursor-pointer ${
						showCompleted
							? "z-0 bg-[var(--bg)] opacity-90"
							: "z-10 bg-[var(--bg)]"
					}`}
					variants={item}
					whileHover={{ y: -5 }}
					onClick={() => setShowCompleted((prev) => !prev)}
				>
					<div className="flex items-center justify-between mb-4">
						<motion.div
							className="p-3 bg-blue-100 rounded-xl"
							whileHover={{ rotate: 15 }}
						>
							<FileText className="h-6 w-6 text-blue-600" />
						</motion.div>
						<motion.span
							className="text-2xl font-bold"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2 }}
						>
							{dashboardData.totalEntries}
						</motion.span>
					</div>
					<h3 className="font-semibold text-[var(--text-secondary)]">
						Total Entries
					</h3>
					<p className="text-sm text-[var(--text-tertiary)]">
						On track this week
					</p>
				</motion.div>

				{/* Front Card */}
				<motion.div
					className={`absolute inset-0 rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-all cursor-pointer   ${
						showCompleted
							? "z-20 opacity-100"
							: "z-0 opacity-0 pointer-events-none"
					} bg-[var(--bg)]`}
					variants={item}
					whileHover={{ y: -5 }}
					onClick={() => setShowCompleted((prev) => !prev)}
					initial={{ rotate: -5, y: 10 }}
					animate={{
						rotate: showCompleted ? 0 : -5,
						y: showCompleted ? 0 : 10,
					}}
					transition={{ duration: 0.3 }}
				>
					<div className="flex items-center justify-between mb-4">
						<motion.div
							className="p-3 bg-teal-100 rounded-xl"
							whileHover={{ rotate: 15 }}
						>
							<CheckCircle className="h-6 w-6 text-teal-600" />
						</motion.div>
						<motion.span
							className="text-2xl font-bold"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2 }}
						>
							{completedEntriesCount}
						</motion.span>
					</div>
					<h3 className="font-semibold text-[var(--text-secondary)]">
						Completed Entries
					</h3>
					<p className="lg:text-sm text-[var(--text-tertiary)] text-xs ">
						{completedEntriesCount > 0
							? "Great job completing these!"
							: "No entries completed yet."}
					</p>
				</motion.div>
			</div>

			{/* --- Progress card --- */}
			<motion.div
				className="rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow"
				variants={item}
				whileHover={{ y: -5 }}
			>
				<div className="flex items-center justify-between mb-4">
					<motion.div
						className="p-3 bg-green-100 rounded-xl"
						whileHover={{ rotate: 15 }}
					>
						<Target className="h-6 w-6 text-green-600" />
					</motion.div>
					<motion.span
						className="text-2xl font-bold"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.3 }}
					>
						{formatNumber(progress)}%
					</motion.span>
				</div>
				<h3 className="font-semibold text-[var(--text-secondary)]">Progress</h3>
				<p className="text-sm text-green-600">Consistent progress!</p>
			</motion.div>

			{/* --- AI Unlock card --- */}
			<motion.div
				className="rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow"
				variants={item}
				whileHover={{ y: -5 }}
			>
				<div className="flex items-center justify-between mb-4">
					<motion.div
						className="p-3 bg-purple-100 rounded-xl"
						whileHover={{ rotate: 15 }}
					>
						<Brain className="h-6 w-6 text-purple-600" />
					</motion.div>
					<motion.span
						className="text-2xl font-bold"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.4 }}
					>
						{dashboardData.aiReadyIn}
					</motion.span>
				</div>
				<h3 className="font-semibold text-[var(--text-secondary)]">
					AI Unlock
				</h3>
				<p className="text-sm text-[var(--text-tertiary)]">days remaining</p>
			</motion.div>

			{/* --- Day Streak card --- */}
			<motion.div
				className="rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow"
				variants={item}
				whileHover={{ y: -5 }}
			>
				<div className="flex items-center justify-between mb-4">
					<motion.div
						className="p-3 bg-orange-100 rounded-xl"
						whileHover={{ rotate: 15 }}
					>
						<Zap className="h-6 w-6 text-orange-600" />
					</motion.div>
					<motion.span
						className="text-2xl font-bold"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.5 }}
					>
						{dashboardData.weeklyStreak}
					</motion.span>
				</div>
				<h3 className="font-semibold text-[var(--text-secondary)]">
					Day Streak
				</h3>
				{dashboardData.weeklyStreak > 0 ? (
					<p className="text-sm text-orange-600">🔥 Keep it up!</p>
				) : (
					<p className="text-[12px] text-orange-600">
						🔥 Every day is a fresh start.
					</p>
				)}
			</motion.div>
		</motion.div>
	);
};

export default StatsCards;
