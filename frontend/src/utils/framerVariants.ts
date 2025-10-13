import { easeOut } from "framer-motion";

export const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: easeOut },
	},
};

export const listVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const cardVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
