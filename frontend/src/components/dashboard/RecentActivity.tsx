import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Entry {
	id: string;
	date: string;
	title: string;
	preview: string;
	wordCount: number;
	status: "completed" | "draft";
}

interface RecentActivityProps {
	recentEntries: Entry[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ recentEntries }) => {
	const navigate = useNavigate();
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.4 }}
			className="lg:col-span-2"
		>
			<div className=" rounded-2xl shadow-sm border-[0.1px] border-[var(--border)]">
				<div className="p-6 border-b border-[var(--border)]">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold ">Recent Activity</h2>
						{recentEntries.length > 3 && (
							<button
								onClick={() => navigate("/dashboard/entries")}
								className="text-[var(--accent)] hover:text-orange-400 font-medium text-sm flex items-center transition-colors duration-300"
							>
								View All <ArrowRight className="h-4 w-4 ml-1" />
							</button>
						)}
					</div>
				</div>
				<div className="p-6">
					{recentEntries.length === 0 ? (
						<div className="flex flex-col items-center justify-center text-center py-10 text-[var(--text-secondary)]">
							<div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-3">
								<Clock className="h-6 w-6 text-[var(--text-tertiary)]" />
							</div>
							<p className="font-medium mb-1">No entries yet</p>
							<p className="text-sm">Create your first entry to see it here.</p>
						</div>
					) : (
						<div className="space-y-6">
							{recentEntries.map((entry, index) => (
								<motion.div
									key={entry.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 + index * 0.1 }}
									className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-[var(--bg-secondary)] transition-all cursor-pointer"
								>
									<div className="flex-shrink-0 w-12 h-12 my-accent-bg rounded-xl flex items-center justify-center text-white font-bold">
										{new Date(entry.date).getDate()}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-1">
											<h3 className="font-semibold  group-hover:text-[var(--accent-secondary)] transition-colors">
												{entry.title}
											</h3>
											<Link
												to={`/dashboard/entries/${entry.id}`}
												className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)] text-sm"
											>
												View Entry
											</Link>
										</div>
										<p className="text-sm text-[var(--text-secondary)] mb-2">
											{new Date(entry.date).toLocaleDateString("en-US", {
												weekday: "long",
												month: "short",
												day: "numeric",
												year: "numeric",
											})}
										</p>
										<p className="text-sm text-[var(--text-tertiary)] line-clamp-2">
											{entry.preview}
										</p>
										<div className="flex items-center space-x-4 mt-3">
											<span
												className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
												style={{
													backgroundColor:
														entry.status === "completed"
															? "var(--success)"
															: "var(--warning)",
												}}
											>
												{entry.status}
											</span>
											<span className="text-xs text-[var(--text-secondary)] flex items-center">
												<Clock className="h-3 w-3 mr-1" />
												{entry.wordCount} words
											</span>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default RecentActivity;
