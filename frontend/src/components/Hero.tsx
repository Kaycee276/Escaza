import SignUpBtn from "../common/SignUpBtn";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

const Hero = () => {
	const theme = useThemeStore((state) => state.theme);
	return (
		<section className="py-20 px-6 overflow-hidden">
			<div className="container mx-auto flex flex-col md:flex-row items-center">
				{/* TEXT SECTION */}
				<motion.div
					className="md:w-1/2 mb-10 md:mb-0"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<motion.h1
						className="text-4xl md:text-5xl font-bold mb-6"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						Never Stress About Your{" "}
						<span className="text-[var(--accent-secondary)]">IT Logbook</span>{" "}
						Again
					</motion.h1>

					<motion.p
						className="text-xl text-[var(--text-secondary)] mb-8"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						AI-powered digital logbook with smart autofill, reminders and
						perfect formatting for Nigerian IT students.
					</motion.p>

					<motion.div
						className="flex flex-col  md:flex-row  space-y-4 sm:space-y-0 sm:space-x-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						<SignUpBtn>Get Started Free</SignUpBtn>
						<motion.button
							className="px-1 text-[var(--text-secondary)] text-lg font-extralight hover:text-[var(--text)] transition-all duration-300"
							whileHover={{ x: 4 }}
						>
							See How It Works
						</motion.button>
					</motion.div>
				</motion.div>

				{/* IMAGE SECTION */}
				<motion.div
					className="md:w-1/2 relative"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5, duration: 0.6 }}
				>
					<div className="relative w-full max-w-lg mx-auto">
						<div className="absolute -top-10 -left-10 w-32 h-32 my-accent-bg-reverse rounded-full mix-blend-multiply filter blur-sm opacity-80" />
						<div className="absolute -bottom-10 -right-10 w-32 h-32 my-accent-bg rounded-full mix-blend-multiply filter blur-sm opacity-80" />
						<div className="relative">
							<img
								src={
									theme === "dark"
										? "/images/dark-hero.png"
										: "/images/light-hero.png"
								}
								alt="Escaza Interface"
								loading="lazy"
								className="rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
