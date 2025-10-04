import { create } from "zustand";

import type { Entry } from "../api/entries";

interface UserData {
	id: string;
	email: string;
	name: string;
	picture: string;
	emailVerified: boolean;
}

export interface LogbookEntry {
	id: string;
	date: string;
	title: string;
	preview: string;
	wordCount: number;
	status: "completed" | "draft";
}

export interface DashboardData {
	totalEntries: number;
	totalDays: number;
	aiReadyIn: number;
	weeklyStreak: number;
	recentEntries: LogbookEntry[];
	entries: Entry[];
}

interface DashboardState {
	user: UserData | null;
	setUser: (user: UserData | null) => void;
	dashboardData: DashboardData | null;
	setDashboardData: (data: DashboardData | null) => void;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	dashboardData: null,
	setDashboardData: (dashboardData) => set({ dashboardData }),
	activeTab: "overview",
	setActiveTab: (activeTab) => set({ activeTab }),
}));
