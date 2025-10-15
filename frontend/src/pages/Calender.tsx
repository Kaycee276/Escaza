import { motion } from "framer-motion";
import { useCalendarStore } from "../store/calendarStore";
import { listVariants, cardVariants } from "../utils/framerVariants";
import {
	formatDateUserFriendly,
	formatDateForInput,
} from "../utils/formatDate";
import { ArrowRight } from "lucide-react";

const Calender = () => {
	const {
		startDate,
		endDate,
		dates,
		completedByDate,
		toggleDay,
		planMarkdown,
		itemsByDate,
	} = useCalendarStore();
	return (
		<motion.div
			className="flex-1 p-4 md:p-8 w-full"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className="text-3xl font-bold mb-4"
			>
				Calender
			</motion.h1>
			{dates.length === 0 ? (
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="text-[var(--text-secondary)]"
				>
					No calender set yet. Use AI Tools to generate one.
				</motion.p>
			) : (
				<div className="space-y-6">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="text-[var(--text-secondary)]"
					>
						{formatDateUserFriendly(startDate || "")}{" "}
						<ArrowRight size={16} className="inline-block" />{" "}
						{formatDateUserFriendly(endDate || "")}
					</motion.p>

					{planMarkdown && (
						<div>
							<h2 className="text-xl font-semibold mb-3">
								Planned Tasks ({dates.length})
							</h2>
							<motion.div
								variants={listVariants}
								initial="hidden"
								animate="visible"
								className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
							>
								{dates.map((d) => (
									<motion.label
										key={d}
										variants={cardVariants}
										onClick={() => toggleDay(d)}
										style={{
											border: completedByDate[d]
												? "1px solid var(--success)"
												: "1px solid var(--border)",
										}}
										className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] shadow-sm"
									>
										<div>
											<div className="text-xs text-[var(--text-secondary)] mb-1">
												{formatDateForInput(d)}
											</div>
											<div className="text-sm">
												{itemsByDate?.[d] || "No specific task"}
											</div>
										</div>
									</motion.label>
								))}
							</motion.div>
						</div>
					)}
				</div>
			)}
		</motion.div>
	);
};

export default Calender;
