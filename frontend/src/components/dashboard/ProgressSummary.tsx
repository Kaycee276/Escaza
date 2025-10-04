import { motion } from "framer-motion";

interface ProgressSummaryProps {
	totalEntries: number;
	totalDays: number;
	progress: number;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
	totalEntries,
	totalDays,
	progress,
}) => (
	<motion.div
		className="p-4 mt-8"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className=" rounded-xl p-4 border border-[var(--border)]">
			<h4 className="font-semibold  mb-2">Progress Summary</h4>
			<div className="space-y-3">
				<div>
					<div className="flex justify-between text-sm mb-1">
						<span className="text-[var(--text-secondary)]">Completion</span>
						<span className="font-medium">{Math.round(progress)}%</span>
					</div>
					<div className="w-full bg-white rounded-full h-2">
						<div
							className="my-accent-bg h-2 rounded-full transition-all duration-500"
							style={{ width: `${progress}%` }}
						></div>
					</div>
				</div>
				<div className="text-xs text-[var(--text-secondary)]">
					{totalEntries} of {totalDays} entries
				</div>
			</div>
		</div>
	</motion.div>
);

export default ProgressSummary;
