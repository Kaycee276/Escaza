import { motion } from "framer-motion";
import {
	containerVariants,
	listVariants,
	cardVariants,
} from "../utils/framerVariants";
import { Link } from "react-router-dom";
import MiniLoader from "../common/MiniLoader";
import type { Entry } from "../api/entries";

interface NewEntryProps {
	loading: boolean;
	error: string | null;
	entries: Entry[];
}

const NewEntry: React.FC<NewEntryProps> = ({ loading, error, entries }) => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="flex-1 p-6 md:p-12 w-full"
		>
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Entries</h1>
				<Link
					to="/dashboard/entries/new"
					className="px-4 py-2 rounded-lg my-accent-bg text-[var(--text)] font-medium shadow-md hover:opacity-90 transition"
				>
					New Entry
				</Link>
			</div>

			{/* Content */}
			{loading ? (
				<MiniLoader />
			) : error ? (
				<p className="text-[var(--error)]">{error}</p>
			) : entries.length === 0 ? (
				<div className="flex flex-col items-center justify-center text-center text-[var(--text-secondary)] mt-24">
					<p className="mb-4 text-lg">No entries found yet.</p>
					<Link
						to="/dashboard/entries/new"
						className="px-6 py-3 rounded-xl my-accent-bg text-[var(--text)] font-medium shadow-md hover:opacity-90 transition"
					>
						Create your first entry
					</Link>
				</div>
			) : (
				<motion.div
					variants={listVariants}
					initial="hidden"
					animate="visible"
					className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3"
				>
					{entries.map((e) => (
						<motion.div
							key={e.id}
							variants={cardVariants}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Link
								to={`/dashboard/entries/${e.id}`}
								className="border border-[var(--border)] rounded-xl p-4 bg-[var(--bg-primary)] shadow-sm block hover:bg-[var(--bg-secondary)] transition overflow-hidden"
							>
								<div className="flex items-center justify-between mb-2 gap-2">
									<h3 className="font-semibold truncate max-w-[70%]">
										{e.title}
									</h3>
									<span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
										{new Date(e.created_at).toLocaleDateString()}
									</span>
								</div>

								<p className="text-sm text-[var(--text-secondary)] line-clamp-3 break-words">
									{e.content}
								</p>

								<div
									className="mt-3 text-xs uppercase tracking-wide"
									style={{
										color:
											e.status === "completed"
												? "var(--accent)"
												: "var(--accent-secondary)",
									}}
								>
									{e.status}
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			)}
		</motion.div>
	);
};

export default NewEntry;
