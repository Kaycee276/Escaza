import { motion, AnimatePresence } from "framer-motion";
import ProgressSummary from "./ProgressSummary";
import { useNavigate } from "react-router-dom";

interface SidebarItem {
	id: string;
	path: string;
	label: string;
	icon: React.ElementType;
}

interface SidebarProps {
	user: {
		name: string;
		picture: string;
	};
	activeTab: string;
	setActiveTab: (tab: string) => void;
	sidebarItems: SidebarItem[];
	totalEntries: number;
	totalDays: number;
	progress: number;
}

const sidebarVariants = {
	hidden: { x: -300, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			// type: "spring",
			stiffness: 100,
			damping: 15,
		},
	},
};

const navItemVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: (i: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.1 + i * 0.05,
			damping: 10,
		},
	}),
	hover: {
		scale: 1.02,
		transition: { duration: 0.2 },
	},
	tap: { scale: 0.98 },
};

const mobileNavVariants = {
	hidden: { y: 50, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			// type: "spring",
			stiffness: 100,
			damping: 15,
		},
	},
};

const Sidebar: React.FC<SidebarProps> = ({
	user,
	activeTab,
	setActiveTab,
	sidebarItems,
	totalEntries,
	totalDays,
	progress,
}) => {
	const navigate = useNavigate();

	const handleTabChange = (tabId: string, path: string) => {
		setActiveTab(tabId);
		navigate(path);
	};

	return (
		<>
			{/* Desktop Sidebar */}
			<motion.aside
				initial="hidden"
				animate="visible"
				variants={sidebarVariants}
				className="w-64 shadow-xl border-r border-[var(--border)] min-h-screen hidden lg:block"
			>
				{/* User Profile Section */}
				<motion.div
					className="p-6 border-b border-[var(--border)]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<div className="flex items-center space-x-3">
						<motion.img
							className="w-12 h-12 rounded-full"
							src={user.picture}
							alt={user.name}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", delay: 0.3 }}
						/>
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4 }}
						>
							<h3 className="font-semibold">{user.name}</h3>
							<p className="text-sm text-[var(--text-secondary)]">IT Student</p>
						</motion.div>
					</div>
				</motion.div>

				{/* Navigation */}
				<nav className="p-4">
					<motion.div className="space-y-2">
						{sidebarItems.map((item, index) => (
							<motion.button
								key={item.id}
								onClick={() => handleTabChange(item.id, item.path)}
								className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
									activeTab === item.id
										? "my-accent-bg text-white shadow-lg"
										: "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
								}`}
								variants={navItemVariants}
								custom={index}
								initial="hidden"
								animate="visible"
								whileHover="hover"
								whileTap="tap"
							>
								<item.icon className="h-5 w-5" />
								<span className="font-medium">{item.label}</span>
							</motion.button>
						))}
					</motion.div>
				</nav>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
				>
					<ProgressSummary
						totalEntries={totalEntries}
						totalDays={totalDays}
						progress={progress}
					/>
				</motion.div>
			</motion.aside>

			{/* Mobile Bottom Navigation */}
			<AnimatePresence>
				<motion.nav
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={mobileNavVariants}
					className="fixed bottom-3 left-5 right-5 z-50 lg:hidden rounded-xl bg-[var(--bg)] border border-[var(--border)] px-4 py-2 flex justify-around shadow-md"
				>
					{sidebarItems.map((item) => (
						<motion.button
							key={item.id}
							onClick={() => handleTabChange(item.id, item.path)}
							className={`flex flex-col items-center text-xs ${
								activeTab === item.id
									? "text-[var(--accent)]"
									: "text-[var(--text-secondary)]"
							}`}
							whileTap={{ scale: 0.9 }}
						>
							<item.icon className="h-5 w-5 mb-1" />
							<span>{item.label}</span>
						</motion.button>
					))}
				</motion.nav>
			</AnimatePresence>
		</>
	);
};

export default Sidebar;
