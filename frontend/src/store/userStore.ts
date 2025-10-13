// Zustand store for global user state with session validation
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserData } from "./dashboardStore";
import apiClient from "../api/client";

interface UserState {
	user: UserData | null;
	loading: boolean;
	setUser: (user: UserData | null) => void;
	validateSession: () => Promise<void>;
}

// base URL handled in apiClient

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			loading: true,
			setUser: (user) => set({ user, loading: false }),
			validateSession: async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) {
						set({ user: null, loading: false });
						return;
					}

					// First, quickly verify token validity
					try {
						await apiClient.get<{ success: boolean; user?: unknown }>(
							`/api/auth/verify`,
							{ headers: { Authorization: `Bearer ${token}` } }
						);
					} catch {
						// Invalid/expired token
						localStorage.removeItem("token");
						localStorage.removeItem("user");
						set({ user: null, loading: false });
						return;
					}

					// Fetch current user details
					try {
						const data = await apiClient.get<{ user: UserData }>(
							`/api/auth/me`,
							{ headers: { Authorization: `Bearer ${token}` } }
						);
						set({ user: data.user, loading: false });
						// keep a copy in localStorage if callers rely on it elsewhere
						try {
							localStorage.setItem("user", JSON.stringify(data.user));
						} catch {
							// ignore quota/serialization errors
						}
					} catch {
						localStorage.removeItem("token");
						localStorage.removeItem("user");
						set({ user: null, loading: false });
					}
				} catch (error) {
					console.error("Session validation failed:", error);
					set({ user: null, loading: false });
				}
			},
		}),
		{
			name: "user-storage",
			partialize: (state) => ({ user: state.user }),
		}
	)
);
