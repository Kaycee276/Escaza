import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "../store/toastStore";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

const Toast = ({ duration = 3000 }: { duration?: number }) => {
	const { toast, clearToast } = useToastStore();

	useEffect(() => {
		if (toast) {
			const timer = setTimeout(clearToast, duration);
			return () => clearTimeout(timer);
		}
	}, [toast, duration, clearToast]);

	if (!toast) return null;

	const borderColors = {
		success: "border-[var(--success)]/20 text-[var(--success)]",
		error: "border-[var(--error)]/20 text-[var(--error)]",
		info: "border-[var(--info)]/20 text-[var(--info)]",
		warning: "border-[var(--warning)]/20 text-[var(--warning)]",
	};

	// Icon mapping
	const icons = {
		success: <CheckCircle className="w-5 h-5" />,
		error: <XCircle className="w-5 h-5" />,
		info: <Info className="w-5 h-5" />,
		warning: <AlertTriangle className="w-5 h-5" />,
	};
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ duration: 0.3 }}
				style={{ zIndex: 1000 }}
				className={`fixed bottom-4 md:bottom-7 right-4 px-6 py-4 lg:max-w-2/5 md:max-w-2/4 max-w-2/3 text-sm rounded-xl bg-[var(--bg)] border shadow-lg ${
					borderColors[toast.type]
				}`}
			>
				<div className="flex items-center gap-3">
					<div className="flex-shrink-0">{icons[toast.type]}</div>
					<span className="flex-1">{toast.message}</span>
					<button
						onClick={clearToast}
						className="flex-shrink-0 font-bold text-lg text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
					>
						×
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Toast;
