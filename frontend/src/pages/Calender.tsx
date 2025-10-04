import { motion } from "framer-motion";
const Calender = () => {
	return (
		<motion.div
			className="flex-1 p-4 md:p-8 w-full"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className="text-3xl font-bold mb-4"
			>
				Calender
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
				className="text-[var(--text-secondary)]"
			>
				No calender set yet. Create one here
			</motion.p>

			{/* generate a button that when clicked it prompts the user for the number of days hoped to be filled and then creates a calender for that many days with each day having a checkbox to mark it as completed */}
			<motion.button
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="mt-4 px-4 py-2 my-accent-bg rounded-lg transition-colors"
			>
				Create Calender
			</motion.button>
		</motion.div>
	);
};

export default Calender;
