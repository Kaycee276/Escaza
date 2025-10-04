import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FiMenu,
	FiX,
	FiChevronRight,
	FiHome,
	FiSettings,
	FiDollarSign,
	FiHelpCircle,
} from "react-icons/fi";
import ThemeToggle from "../common/ThemeToggle";
import SignUpBtn from "../common/SignUpBtn";
import Logo from "../common/Logo";
import { useUser } from "../hooks/useUser";
import UserProfile from "../common/UserProfile";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
import handleLogout from "../utils/logout";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, loading } = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const navLinks = [
		{ name: "Features", href: "#features", icon: FiHome },
		{ name: "How It Works", href: "#how-it-works", icon: FiSettings },
		{ name: "Pricing", href: "#pricing", icon: FiDollarSign },
		{ name: "FAQ", href: "#faq", icon: FiHelpCircle },
	];

	const isDashboardRoute = useMatch("/dashboard/*");

	return (
		<>
			<motion.nav
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: 0.6,
					delay: 0.2,
					ease: "easeOut",
					type: "spring",
					stiffness: 300,
				}}
				className="sticky top-2 md:top-0 z-50 backdrop-blur-sm shadow-lg rounded-3xl md:rounded-none"
			>
				<div className="container mx-auto px-6 py-2 md:py-4">
					<div className="flex justify-between items-center ">
						{/* Logo */}
						<Logo />

						{/* Desktop Navigation */}
						{!isDashboardRoute && (
							<div className="hidden lg:flex items-center space-x-8">
								{navLinks.map((link) => (
									<motion.a
										key={link.name}
										href={link.href}
										className="relative text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 font-medium"
										whileHover={{ y: -1 }}
										transition={{ type: "spring", stiffness: 300 }}
									>
										{link.name}
										<motion.div
											className="absolute -bottom-1 left-0 w-0 h-0.5 my-accent-bg rounded-full"
											whileHover={{ width: "100%" }}
											transition={{ duration: 0.3 }}
										/>
									</motion.a>
								))}
							</div>
						)}

						{/* Desktop Buttons */}
						<div className="hidden lg:flex items-center space-x-4">
							<ThemeToggle />
							{!loading && user ? (
								<UserProfile
									name={user.name}
									picture={user.picture}
									onLogout={() => handleLogout({ navigate })}
								/>
							) : (
								<SignUpBtn />
							)}
						</div>

						{/* Mobile Menu Button */}
						{!isDashboardRoute ? (
							<motion.button
								className="lg:hidden relative p-3 rounded-xl bg-[var(--bg-secondary)] "
								onClick={toggleMenu}
								whileTap={{ scale: 0.95 }}
								aria-label="Toggle menu"
							>
								<motion.div
									animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
									transition={{ duration: 0.3 }}
								>
									{isOpen ? (
										<FiX size={24} className="text-[var(--text-secondary)]" />
									) : (
										<FiMenu
											size={24}
											className="text-[var(--text-secondary)]"
										/>
									)}
								</motion.div>
							</motion.button>
						) : (
							<div className="lg:hidden flex items-center gap-2">
								<>
									<ThemeToggle />
									{!loading && user ? (
										<UserProfile
											name={user.name}
											picture={user.picture}
											onLogout={() => handleLogout({ navigate })}
										/>
									) : (
										<SignUpBtn />
									)}
								</>
							</div>
						)}
					</div>
				</div>
			</motion.nav>

			{/* Mobile Menu */}
			{location.pathname !== "/dashboard" && (
				<AnimatePresence>
					{isOpen && (
						<>
							{/* Backdrop */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="fixed inset-0 z-40 bg-[var(--bg-secondary)]/20 backdrop-blur-sm"
								onClick={() => setIsOpen(false)}
							/>

							{/* Menu Panel */}
							<motion.div
								initial={{ x: "100%", opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: "100%", opacity: 0 }}
								transition={{ type: "spring", damping: 25, stiffness: 200 }}
								className="fixed top-0 right-0 w-80 h-full bg-[var(--bg-secondary)] backdrop-blur-xl z-50 shadow-2xl "
							>
								{/* Header */}
								<div className="p-5 shadow-xl">
									<div className="flex items-center justify-end">
										<motion.button
											onClick={() => setIsOpen(false)}
											className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors duration-200"
											whileTap={{ scale: 0.95 }}
										>
											<FiX
												size={24}
												className="hover:text-[var(--text-secondary)]"
											/>
										</motion.button>
									</div>
								</div>

								{/* Navigation Links */}
								{location.pathname !== "/dashboard" && (
									<div className="p-3 space-y-2">
										{navLinks.map((link, index) => {
											const Icon = link.icon;
											return (
												<motion.a
													key={link.name}
													href={link.href}
													className="group flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg)] transition-all duration-300"
													onClick={() => {
														setIsOpen(false);
														setTimeout(() => {
															const el = document.querySelector(link.href);
															if (el) {
																el.scrollIntoView({ behavior: "smooth" });
															}
														}, 300);
													}}
													initial={{ opacity: 0, x: 50 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{
														delay: 0.1 * index,
														duration: 0.1,
													}}
													whileHover={{ x: 4 }}
												>
													<div className="flex items-center space-x-4">
														<div className="p-2 rounded-lg my-accent-bg group-hover:shadow-lg transition-shadow duration-300">
															<Icon size={20} />
														</div>
														<span className="text-lg font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300">
															{link.name}
														</span>
													</div>
													<motion.div
														className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300"
														whileHover={{ x: 2 }}
													>
														<FiChevronRight size={20} />
													</motion.div>
												</motion.a>
											);
										})}
									</div>
								)}
								{/* Theme Toggle */}
								<div className="p-4 border-t border-[var(--border)]">
									<ThemeToggle />
								</div>

								{/* Auth Buttons */}
								<div className=" flex flex-col p-6 space-y-4 border-t border-[var(--border)] mt-auto">
									{!loading && user ? (
										<UserProfile
											name={user.name}
											picture={user.picture}
											onLogout={() => handleLogout({ navigate })}
										/>
									) : (
										<SignUpBtn>Sign Up</SignUpBtn>
									)}
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			)}
		</>
	);
};

export default NavBar;
