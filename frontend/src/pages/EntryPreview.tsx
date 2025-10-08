import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { ImSpinner8 } from "react-icons/im";

import { getEntry, updateEntry, deleteEntry } from "../api/entries";

import CustomDropdown from "../common/Dropdown";
import MiniLoader from "../common/MiniLoader";

import type { Entry } from "../api/entries";

import { useToastStore } from "../store/toastStore";

const EntryPreview = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [entry, setEntry] = useState<Entry | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState<Entry["status"]>("completed");
	const [isSaving, setIsSaving] = useState(false);

	// delete confirmation modal state
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [confirmText, setConfirmText] = useState("");

	const showToast = useToastStore((state) => state.showToast);

	useEffect(() => {
		const fetchEntry = async () => {
			try {
				setError(null);
				const token = localStorage.getItem("token");
				if (!token) {
					navigate("/signin");
					return;
				}
				if (!id) return;
				const data = await getEntry(token, id);
				setEntry(data);
				setTitle(data.title);
				setContent(data.content);
				setStatus(data.status);
			} catch (e: unknown) {
				const message = e instanceof Error ? e.message : "Failed to load entry";
				setError(message);
			} finally {
				setLoading(false);
			}
		};
		fetchEntry();
	}, [id, navigate]);

	const handleSave = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/signin");
				return;
			}
			if (!id) return;
			setIsSaving(true);
			if (!title.trim() || !content.trim()) {
				showToast("Title and content cannot be empty", "error");
				setIsSaving(false);
				return;
			}
			const updated = await updateEntry(token, id, {
				title,
				content,
				status,
			});
			setEntry(updated);
			showToast("Entry updated successfully", "success");
			setIsEditing(false);
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Failed to update entry";
			showToast(message, "error");
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/signin");
				return;
			}
			if (!id) return;
			await deleteEntry(token, id);
			showToast("Entry deleted successfully", "success");
			navigate("/dashboard/entries");
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Failed to delete entry";
			showToast(message, "error");
		}
	};

	if (loading) return <MiniLoader />;
	if (error)
		return (
			<div className="flex-1 p-6 md:p-12 w-full text-[var(--error)]">
				{error}
				showToast(error, "error");
			</div>
		);
	if (!entry) return null;

	return (
		<div className="flex-1 p-6 pb-20 md:p-12 w-full overflow-hidden">
			{/* Header */}
			<div className="flex items-start justify-between mb-6 gap-4">
				{isEditing ? (
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="text-3xl font-bold bg-transparent border-b border-[var(--border)] outline-none flex-1 break-words"
					/>
				) : (
					<h1 className="text-3xl font-bold truncate max-w-[70%] break-words">
						{entry.title}
					</h1>
				)}
				<Link to="/dashboard/entries" className="text-sm text-[var(--accent)]">
					<ArrowLeft className="text-sm h-4 w-4 inline-flex" /> Back to all
				</Link>
			</div>

			{/* Meta info */}
			<div className="text-sm text-[var(--text-secondary)] mb-6">
				{new Date(entry.created_at).toLocaleString()} ·{" "}
				<span
					style={{
						color:
							entry.status === "completed"
								? "var(--accent)"
								: "var(--accent-secondary)",
					}}
				>
					{entry.status}
				</span>
			</div>

			{/* Content / Editing */}
			{isEditing ? (
				<div className="space-y-6 max-w-3xl">
					<textarea
						rows={12}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="w-full p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] outline-none resize-y"
					/>

					<div className="flex items-center gap-4">
						<label className="text-sm text-[var(--text-secondary)]">
							Status
						</label>
						<CustomDropdown
							options={["completed", "draft"]}
							value={status}
							onChange={(val) => setStatus(val as Entry["status"])}
						/>
					</div>

					<div className="flex gap-3 justify-end">
						<button
							onClick={() => setIsEditing(false)}
							className="px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]"
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className="px-4 py-2 rounded-lg my-accent-bg text-white"
							disabled={isSaving}
						>
							{isSaving ? (
								<ImSpinner8 className="animate-spin inline-block mr-2" />
							) : null}
							Save Changes
						</button>
					</div>
				</div>
			) : (
				<div className="prose max-w-none whitespace-pre-wrap text-[var(--text)] break-words">
					{entry.content}
					<div className="mt-6 flex gap-3">
						<button
							onClick={() => setIsEditing(true)}
							className="px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]"
						>
							Edit
						</button>
						<button
							onClick={() => setShowDeleteConfirm(true)}
							className="px-4 py-2 rounded-lg border-[var(--error)] border text-[var(--error)]  transition"
						>
							Delete
						</button>
					</div>
				</div>
			)}

			{/* Delete confirmation modal */}
			{showDeleteConfirm && (
				<div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50">
					<div className="bg-[var(--bg-secondary)] p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
						<h2 className="text-lg font-semibold text-[var(--text-secondary)] mb-4">
							Are you sure you want to delete this entry?
						</h2>
						<p className="text-sm  mb-3">
							Type{" "}
							<span className="font-bold text-[var(--error)] ">DELETE</span>{" "}
							below to confirm:
						</p>
						<input
							type="text"
							value={confirmText}
							onChange={(e) => setConfirmText(e.target.value)}
							className="border-b px-3 w-full mb-4 outline-none"
						/>
						<div className="flex justify-center gap-4">
							<button
								disabled={confirmText !== "DELETE"}
								onClick={() => {
									handleDelete();
									setShowDeleteConfirm(false);
									setConfirmText("");
								}}
								className={`px-4 py-2 rounded-lg ${
									confirmText === "DELETE"
										? "bg-[var(--error)] "
										: "bg-[var(--bg-secondary)] text-[var(--text-tertiary)] cursor-not-allowed"
								}`}
							>
								Confirm Delete
							</button>
							<button
								onClick={() => {
									setShowDeleteConfirm(false);
									setConfirmText("");
								}}
								className="px-4 py-2 rounded-lg border-[var(--border)] border-2  "
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EntryPreview;
