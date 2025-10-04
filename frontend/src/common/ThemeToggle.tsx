import { useThemeStore } from "../store/themeStore";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	return (
		<motion.button
			onClick={toggleTheme}
			className="relative w-14 h-8 rounded-full p-1 transition-colors duration-300 "
			whileTap={{ scale: 0.95 }}
		>
			{/* Background gradient */}
			<div className="absolute inset-0 rounded-full my-accent-bg opacity-80" />

			{/* Slider */}
			<motion.div
				className="relative w-6 h-6 bg-[var(--bg)] rounded-full shadow-lg flex items-center justify-center"
				animate={{
					x: theme === "dark" ? 24 : 0,
				}}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				<motion.div
					animate={{
						rotate: theme === "dark" ? 360 : 0,
						scale: theme === "dark" ? 1.1 : 1,
					}}
					transition={{ duration: 0.3 }}
				>
					{theme === "dark" ? (
						<FiMoon size={14} className="text-[var(--accent)]" />
					) : (
						<FiSun size={14} className="text-[var(--accent-secondary)]" />
					)}
				</motion.div>
			</motion.div>
		</motion.button>
	);
};

export default ThemeToggle;
