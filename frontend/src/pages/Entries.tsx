import { useMemo, useState, useCallback, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { CgArrowTopRight } from "react-icons/cg";
import { ImSpinner8 } from "react-icons/im";

import { motion, easeOut } from "framer-motion";

import { createEntry } from "../api/entries";

import { useEntries } from "../hooks/useEntries";

import { fetchAutoComplete } from "../api/ai";

import MiniLoader from "../common/MiniLoader";

import { ArrowLeft, Sparkles } from "lucide-react";

import { useToastStore } from "../store/toastStore";

const Entries = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const showToast = useToastStore((state) => state.showToast);
	const isNew = useMemo(
		() => location.pathname.endsWith("/new"),
		[location.pathname]
	);
	const { entries, loading, error } = useEntries();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
	const debounceTimer = useRef<number | null>(null);
	const [showPreview, setShowPreview] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isSavingDraft, setIsSavingDraft] = useState(false);

	const handleSave = async () => {
		try {
			if (!title.trim() || !content.trim()) {
				showToast("Please provide a title and content", "error");
				return;
			}
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/signin");
				return;
			}
			setIsSaving(true);
			await createEntry(token, { title, content, status: "completed" });
			showToast("Entry saved successfully", "success");
			setTitle("");
			setContent("");
			navigate("/dashboard/entries");
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Failed to save entry";
			showToast(message, "error");
		} finally {
			setIsSaving(false);
		}
	};

	const handleSaveAsDraft = async () => {
		try {
			if (!title.trim() || !content.trim()) {
				showToast("Please provide a title and content", "error");
				return;
			}
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/signin");
				return;
			}
			setIsSavingDraft(true);
			const entry = await createEntry(token, {
				title,
				content,
				status: "draft",
			});

			showToast("Draft saved successfully", "success");
			setTitle("");
			setContent("");
			navigate(`/dashboard/entries/${entry.id}`);
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Failed to save draft";
			showToast(message, "error");
		} finally {
			setIsSavingDraft(false);
		}
	};

	const debouncedAutocomplete = useCallback(
		async (text: string) => {
			if (text.length < 10) {
				setSuggestions([]);
				return;
			}

			setIsLoadingSuggestion(true);
			try {
				const result = await fetchAutoComplete(text, title);

				if (result && typeof result.suggestions === "string") {
					setSuggestions([result.suggestions]);
				} else {
					setSuggestions([]);
				}
			} catch (error) {
				console.error("Autocomplete failed:", error);
				showToast("Autocomplete failed. Please try again.", "error");
				setSuggestions([]);
			} finally {
				setIsLoadingSuggestion(false);
			}
		},
		[showToast, title]
	);

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newContent = e.target.value;
		setContent(newContent);

		// Clear previous timer
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		// Set new timer for debounced autocomplete
		debounceTimer.current = setTimeout(() => {
			debouncedAutocomplete(newContent);
		}, 1000); // 1 second delay
	};

	const acceptSuggestion = (suggestion: string) => {
		setContent((prev) => prev + suggestion);
		setSuggestions([]);
	};

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: easeOut },
		},
	};

	const listVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 15 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	if (!isNew) {
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
	}

	// New Entry form
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="flex-1 p-6 md:p-12 w-full pb-20 md:pb-18"
		>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">New Entry</h1>
				<Link to="/dashboard/entries" className="text-sm text-[var(--accent)]">
					<ArrowLeft className="text-sm h-4 w-4 inline-flex" /> Back to all
				</Link>
			</div>

			<motion.div
				className="border border-[var(--border)] rounded-2xl shadow-sm p-6 max-w-3xl space-y-6"
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<motion.input
					type="text"
					placeholder="Entry title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] outline-none text-lg font-medium"
					whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
				/>

				<div className="flex gap-2 border-b border-[var(--border)]">
					<button
						onClick={() => setShowPreview(false)}
						className={`px-4 py-2 text-sm font-medium transition ${
							!showPreview
								? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
								: "text-[var(--text-secondary)] hover:text-[var(--text)]"
						}`}
					>
						Write
					</button>
					<button
						onClick={() => setShowPreview(true)}
						className={`px-4 py-2 text-sm font-medium transition ${
							showPreview
								? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
								: "text-[var(--text-secondary)] hover:text-[var(--text)]"
						}`}
					>
						Preview
					</button>
				</div>

				<div className="relative">
					{!showPreview ? (
						<>
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: easeOut }}
								className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-2"
							>
								<p>
									Supports{" "}
									<motion.span
										whileHover={{ scale: 1.05 }}
										className="text-[var(--accent)] font-medium"
									>
										Markdown
									</motion.span>{" "}
									syntax
								</p>
								<motion.a
									href="https://www.markdownguide.org/basic-syntax/"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.05, x: 2 }}
									whileTap={{ scale: 0.97 }}
									className="text-[var(--accent)] hover:underline flex items-center gap-1"
								>
									Learn Markdown <CgArrowTopRight className="h-4 w-4" />
								</motion.a>
							</motion.div>

							<motion.textarea
								placeholder="Write your logbook entry... "
								rows={8}
								value={content}
								onChange={handleContentChange}
								onKeyDown={(e) => {
									if (
										e.key === "Tab" &&
										suggestions.length > 0 &&
										!e.shiftKey
									) {
										e.preventDefault();
										acceptSuggestion(suggestions[0]);
									}
									if (e.key === "Escape" && suggestions.length > 0) {
										e.preventDefault();
										setSuggestions([]);
									}
								}}
								className="w-full p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] outline-none leading-relaxed"
								whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
							/>

							{/* AI Suggestions */}
							{isLoadingSuggestion && (
								<div className="absolute bottom-2 right-2 flex items-center gap-2 text-xs text-[var(--text-secondary animate-pulse)]">
									<Sparkles className="h-3 w-3 " />
									AI thinking...
								</div>
							)}

							{suggestions.length > 0 && (
								<div>
									{/* Desktop view */}
									<div className="hidden sm:block absolute bottom-4 left-4 right-4 p-2 bg-[var(--bg-secondary)]/90 backdrop-blur-sm border border-[var(--border)] rounded-lg text-sm text-[var(--text)] italic pointer-events-none opacity-80">
										<div className="flex items-center gap-2 mb-1">
											<Sparkles className="h-3 w-3 text-[var(--accent)] flex-shrink-0" />
											<span className="text-xs font-medium text-[var(--text-secondary)]">
												AI Suggestion:
											</span>
										</div>
										<p className="text-xs mb-1">{suggestions[0]}</p>
										<div className="text-xs text-[var(--text-secondary)]">
											Press{" "}
											<kbd className="bg-[var(--bg-primary)] px-1 py-0.5 rounded border">
												Tab
											</kbd>{" "}
											to accept •{" "}
											<kbd className="bg-[var(--bg-primary)] px-1 py-0.5 rounded border">
												Esc
											</kbd>{" "}
											to dismiss
										</div>
									</div>

									{/* Mobile view */}
									<div className="mt-2 sm:hidden p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<Sparkles className="h-4 w-4 text-[var(--accent)]" />
											<span className="text-sm font-medium text-[var(--text-secondary)]">
												AI Suggestion:
											</span>
										</div>
										<p className="text-sm text-[var(--text)] mb-2 italic">
											{suggestions[0]}
										</p>
										<div className="flex gap-2">
											<button
												onClick={() => acceptSuggestion(suggestions[0])}
												className="px-3 py-1 text-xs bg-[var(--accent)] text-white rounded hover:opacity-90 transition"
											>
												Accept
											</button>
											<button
												onClick={() => setSuggestions([])}
												className="px-3 py-1 text-xs border border-[var(--border)] rounded hover:bg-[var(--bg-primary)] transition"
											>
												Dismiss
											</button>
										</div>
									</div>
								</div>
							)}
						</>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="w-full min-h-[200px] p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] prose prose-invert prose-sm max-w-none"
						>
							{content ? (
								<ReactMarkdown>{content}</ReactMarkdown>
							) : (
								<p className="text-[var(--text-secondary)] italic">
									Nothing to preview yet. Start writing in the Write tab.
								</p>
							)}
						</motion.div>
					)}
				</div>

				<div className="flex flex-wrap gap-4 justify-end pt-2">
					<motion.button
						onClick={handleSave}
						className="px-4 py-3 rounded-lg my-accent-bg font-medium shadow "
						whileTap={{ scale: 0.95 }}
						disabled={isSaving}
					>
						{isSaving ? (
							<ImSpinner8 className="h-5 w-5 animate-spin mx-auto inline-block mr-2" />
						) : null}
						Save Entry
					</motion.button>

					<motion.button
						onClick={handleSaveAsDraft}
						className="px-4 py-3 rounded-lg my-accent-bg-reverse font-medium border border-[var(--border)]  transition"
						whileTap={{ scale: 0.95 }}
						disabled={isSavingDraft}
					>
						{isSavingDraft ? (
							<ImSpinner8 className="h-5 w-5 animate-spin mx-auto inline-block mr-2" />
						) : null}
						Save as Draft
					</motion.button>

					<motion.button
						onClick={() => {
							setTitle("");
							setContent("");
							setSuggestions([]);
							if (debounceTimer.current) {
								clearTimeout(debounceTimer.current);
							}
						}}
						className="px-6 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] font-medium hover:bg-[var(--bg-secondary)] transition"
						whileTap={{ scale: 0.95 }}
					>
						Clear
					</motion.button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Entries;
