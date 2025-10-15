import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateITPlan } from "../api/ai";
import { useCalendarStore } from "../store/calendarStore";
import { useToastStore } from "../store/toastStore";
import { Sparkles } from "lucide-react";
import { ImSpinner8 } from "react-icons/im";

const AITools = () => {
	const navigate = useNavigate();
	const setPlan = useCalendarStore((s) => s.setPlan);
	const { showToast } = useToastStore();
	const [workDescription, setWorkDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [durationDays, setDurationDays] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onGenerate = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (!workDescription.trim()) {
			// setError("Please describe the kind of work.");
			showToast("Please describe the kind of work.", "error");
			return;
		}
		if (!((startDate && endDate) || Number(durationDays) > 0)) {
			showToast("Provide start & end dates or a duration in days.", "error");
			// setError("Provide start & end dates or a duration in days
			// .");
			return;
		}
		try {
			setLoading(true);
			const res = await generateITPlan({
				workDescription,
				startDate: startDate || undefined,
				endDate: endDate || undefined,
				durationDays: durationDays ? Number(durationDays) : undefined,
			});
			setPlan({
				startDate: res.startDate,
				endDate: res.endDate,
				dates: res.dates,
				planMarkdown: res.planMarkdown,
				entries: res.entries,
				title: res.title,
			});
			showToast("AI plan is ready in your Calender", "success");
			navigate("/dashboard/calender");
		} catch (err: unknown) {
			// setError(err instanceof Error ? err.message : "Failed to generate plan");
			showToast(
				err instanceof Error ? err.message : "Failed to generate plan",
				"error"
			);
		} finally {
			setLoading(false);
		}
	};

	const goToCalendar = () => {
		navigate("/dashboard/calender");
	};

	return (
		<div className="flex-1 p-4 md:p-8 w-full mb-20">
			<h1 className="text-2xl font-bold mb-4">AI Tools</h1>
			<p className="text-[var(--text-secondary)] mb-6">
				Generate an IT plan and auto-populate the calender.
			</p>

			<form
				onSubmit={onGenerate}
				className="space-y-4 max-w-2xl border border-[var(--border)] rounded-md p-4"
			>
				<div>
					<label className="block text-sm font-medium mb-1">
						Work description
					</label>
					<textarea
						className="w-full p-3 rounded-md outline-none text-sm border border-[var(--border)]"
						rows={4}
						placeholder="e.g., Frontend development with React, implementing features, fixing bugs, writing documentation"
						value={workDescription}
						onChange={(e) => setWorkDescription(e.target.value)}
						disabled={loading}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					<div>
						<label className="block text-sm font-medium mb-1">Start date</label>
						<input
							type="date"
							className="w-full p-2 rounded-md bg-[var(--bg-tertiary)] outline-none"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							disabled={loading}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">End date</label>
						<input
							type="date"
							className="w-full p-2 rounded-md bg-[var(--bg-tertiary)] outline-none"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							disabled={loading}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							Or duration (days)
						</label>
						<input
							type="number"
							min={1}
							className="w-full p-2 rounded-md bg-[var(--bg-secondary)] outline-none"
							value={durationDays}
							onChange={(e) => setDurationDays(e.target.value)}
							disabled={loading}
							placeholder="e.g., 90"
						/>
					</div>
				</div>

				{error && <p className="text-[var(--error)] text-sm">{error}</p>}

				<div className="flex gap-3">
					<button
						type="submit"
						className="px-4 py-2 my-accent-bg rounded-lg disabled:opacity-60"
						disabled={loading}
					>
						{loading ? (
							<>
								<ImSpinner8 className="animate-spin inline-block mr-2" />
								Generating...
							</>
						) : (
							<>
								<Sparkles className="h-4 w-4 text-[var(--accent-secondary)] inline-block mr-2" />
								Generate Plan
							</>
						)}
					</button>
					<button
						type="button"
						onClick={goToCalendar}
						className="px-4 py-2 bg-[var(--bg-secondary)] rounded-lg"
						disabled={loading}
					>
						Open Calender
					</button>
				</div>
			</form>
		</div>
	);
};

export default AITools;
