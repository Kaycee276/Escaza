import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

type ToastState = {
	toast: { message: string; type: ToastType } | null;
	showToast: (message: string, type: ToastType) => void;
	clearToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
	toast: null,
	showToast: (message, type) => set({ toast: { message, type } }),
	clearToast: () => set({ toast: null }),
}));
