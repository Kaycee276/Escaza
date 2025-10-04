import type React from "react";

interface WeeklyGoalProps {
	weeklyStreak: number;
}
const WeeklyGoal: React.FC<WeeklyGoalProps> = ({ weeklyStreak }) => (
	<div className="my-accent-bg-reverse rounded-2xl p-6 text-white">
		<h3 className="font-bold mb-2">Weekly Goal</h3>
		<p className="text-blue-100 text-sm mb-4">Complete 5 entries this week</p>
		<div className="flex items-center justify-between mb-3">
			<span className="text-sm">{weeklyStreak} of 5 completed</span>
			<span className="text-sm font-bold">{weeklyStreak}</span>
		</div>
		<div className="w-full bg-[var(--bg)] rounded-full h-2">
			<div
				className="my-accent-bg h-2 rounded-full"
				style={{ maxWidth: `${(weeklyStreak / 5) * 100}%` }}
			></div>
		</div>
	</div>
);

export default WeeklyGoal;
