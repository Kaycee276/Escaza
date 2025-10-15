import { create } from "zustand";

function distributePlanAcrossDates(
	dates: string[],
	markdown: string
): Record<string, string> {
	const lines = markdown
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter((l) => l.length > 0);

	// Extract bullet content by removing leading list markers
	const bullets = lines
		.map((l) => l.replace(/^[-*]\s+/, "").trim())
		.filter((l) => l.length > 0);

	const map: Record<string, string> = {};
	if (bullets.length === 0) {
		dates.forEach((d) => (map[d] = ""));
		return map;
	}

	// Distribute bullets across days; if fewer bullets than days, reuse last
	for (let i = 0; i < dates.length; i++) {
		const idx = Math.min(i, bullets.length - 1);
		map[dates[i]] = bullets[idx];
	}
	return map;
}

export interface ITCalendarState {
	startDate: string | null;
	endDate: string | null;
	dates: string[];
	planMarkdown: string;
	completedByDate: Record<string, boolean>;
	itemsByDate?: Record<string, string>;
	overallTitle?: string | null;
	setPlan: (data: {
		startDate: string;
		endDate: string;
		dates: string[];
		planMarkdown: string;
		entries?: Array<{ date: string; title: string; content: string }>;
		title?: string;
	}) => void;
	toggleDay: (date: string) => void;
	reset: () => void;
}

export const useCalendarStore = create<ITCalendarState>((set) => ({
	startDate: null,
	endDate: null,
	dates: [],
	planMarkdown: "",
	completedByDate: {},
	setPlan: ({ startDate, endDate, dates, planMarkdown, entries, title }) =>
		set(() => ({
			startDate,
			endDate,
			dates,
			planMarkdown,
			completedByDate: {},
			itemsByDate:
				entries && entries.length > 0
					? Object.fromEntries(
							entries.map((e) => [e.date, `${e.title}: ${e.content}`])
					  )
					: distributePlanAcrossDates(dates, planMarkdown),
			overallTitle: title || null,
		})),
	toggleDay: (date) =>
		set((state) => ({
			completedByDate: {
				...state.completedByDate,
				[date]: !state.completedByDate[date],
			},
		})),
	reset: () =>
		set(() => ({
			startDate: null,
			endDate: null,
			dates: [],
			planMarkdown: "",
			completedByDate: {},
		})),
}));
