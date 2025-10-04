import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
	theme:
		(localStorage.getItem("theme") as Theme) ||
		(window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"),
	setTheme: (theme) => {
		localStorage.setItem("theme", theme);
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		set({ theme });
	},
	toggleTheme: () =>
		set((state) => {
			const newTheme = state.theme === "dark" ? "light" : "dark";
			localStorage.setItem("theme", newTheme);
			if (newTheme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			return { theme: newTheme };
		}),
}));
