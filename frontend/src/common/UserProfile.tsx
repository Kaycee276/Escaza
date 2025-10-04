import { useState, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useClickOutside } from "../hooks/useClickOutside";

interface UserProfileProps {
	name: string;
	picture?: string;
	onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
	name,
	picture,
	onLogout,
}) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref as React.RefObject<HTMLElement>, () => setOpen(false));

	return (
		<div ref={ref} className="relative">
			<button
				className="flex items-center gap-2 focus:outline-none"
				onClick={() => setOpen((prev) => !prev)}
			>
				{picture ? (
					<img
						src={picture}
						alt={name}
						className="w-8 h-8 rounded-full border"
					/>
				) : (
					<div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[var(--text-secondary)] font-bold">
						{name.charAt(0).toUpperCase()}
					</div>
				)}
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-2 w-40 p-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg z-50"
					>
						<button
							className="block w-full text-left px-4 py-2 rounded-md hover:bg-[var(--bg-tertiary)] hover:text-[var(--error)]"
							onClick={onLogout}
						>
							Logout
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default UserProfile;
