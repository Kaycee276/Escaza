import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Search, Clock, Trash2 } from "lucide-react";

import { useEntries } from "../hooks/useEntries";
import { useClickOutside } from "../hooks/useClickOutside";

import MiniLoader from "./MiniLoader";

const STORAGE_KEY = "search_history";

interface searchBarProps {
	filter: string;
}

const SearchBar: React.FC<searchBarProps> = ({ filter }) => {
	const { entries, loading } = useEntries();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [history, setHistory] = useState<string[]>([]);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	useClickOutside(wrapperRef, () => setOpen(false));

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			setHistory(JSON.parse(stored));
		}
	}, []);

	const addToHistory = (term: string) => {
		if (!term.trim()) return;
		const updated = [term, ...history.filter((h) => h !== term)].slice(0, 5);
		setHistory(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	};

	const clearHistory = () => {
		setHistory([]);
		localStorage.removeItem(STORAGE_KEY);
	};

	const filteredEntries = useMemo(() => {
		if (!query.trim()) return [];

		let results = entries.filter((entry) =>
			entry.title.toLowerCase().includes(query.toLowerCase())
		);

		if (filter === "completed") {
			results = results.filter((entry) => entry.status === "completed");
		} else if (filter === "draft") {
			results = results.filter((entry) => entry.status === "draft");
		}

		return results;
	}, [entries, query, filter]);

	return (
		<div ref={wrapperRef} className="relative flex-1 md:flex-none">
			{/* Input */}
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
			<input
				type="text"
				placeholder="Search entries..."
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setOpen(true);
				}}
				onFocus={() => setOpen(true)}
				className="pl-10 pr-4 py-2 bg-[var(--bg-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent w-full text-[var(--text-secondary)]"
			/>

			{/* Results / History Dropdown */}
			{open && (
				<div className="absolute left-0 right-0 mt-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
					{query ? (
						loading ? (
							<p className="p-3 text-sm text-[var(--text-secondary)]">
								<MiniLoader />
							</p>
						) : filteredEntries.length === 0 ? (
							<p className="p-3 text-sm text-[var(--text-secondary)]">
								No entries found
							</p>
						) : (
							<ul>
								{filteredEntries.map((entry) => (
									<li
										key={entry.id}
										className="p-3 text-sm hover:bg-[var(--bg-secondary)] cursor-pointer"
										onClick={() => {
											addToHistory(entry.title);
											navigate(`/dashboard/entries/${entry.id}`);
											setOpen(false);
											setQuery("");
										}}
									>
										{entry.title}
									</li>
								))}
							</ul>
						)
					) : history.length > 0 ? (
						<div>
							<ul>
								{history.map((item, idx) => (
									<li
										key={idx}
										className="p-3 text-sm flex items-center gap-2 hover:bg-[var(--bg-secondary)] cursor-pointer"
										onClick={() => {
											setQuery(item);
											setOpen(true);
										}}
									>
										<Clock className="h-4 w-4 text-[var(--text-secondary)]" />
										{item}
									</li>
								))}
							</ul>
							<button
								onClick={clearHistory}
								className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-[var(--error)] hover:bg-[var(--bg-secondary)] border-t border-[var(--border)]"
							>
								<Trash2 className="h-4 w-4" />
								Clear history
							</button>
						</div>
					) : (
						<p className="p-3 text-sm text-[var(--text-secondary)]">
							No recent searches
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
