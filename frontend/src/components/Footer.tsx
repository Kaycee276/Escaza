import { FiTwitter, FiInstagram, FiFacebook } from "react-icons/fi";
import Logo from "../common/Logo";
import { motion } from "framer-motion";

const Footer = () => {
	return (
		<footer className="bg-black text-white py-12">
			<div className="container mx-auto px-6">
				<div className="grid md:grid-cols-3 gap-10 mb-4">
					{/* Logo & About */}
					<div>
						<Logo />
						<p className="text-[var(--text-tertiary)] mt-2">
							The smart logbook companion for Nigerian IT students.
						</p>
					</div>

					{/* Product */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Product</h4>
						<ul className="space-y-2">
							{["Features", "Pricing", "FAQ", "Roadmap"].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="text-[var(--text-tertiary)] hover:text-white"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Company</h4>
						<ul className="space-y-2">
							{["About", "Blog", "Careers", "Contact"].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="text-[var(--text-tertiary)] hover:text-white"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Connect */}
				<div>
					<h4 className="text-lg font-semibold mb-4">Connect</h4>
					<div className="flex space-x-4 mb-4">
						{[
							{
								icon: <FiTwitter />,
								label: "Twitter",
								href: "https://x.com/",
							},
							{
								icon: <FiInstagram />,
								label: "Instagram",
								href: "https://instagram.com/",
							},
							{
								icon: <FiFacebook />,
								label: "Facebook",
								href: "https://facebook.com",
							},
						].map((social, index) => (
							<motion.a
								initial={{ opacity: 0, x: 10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
									type: "spring",
									stiffness: 300,
								}}
								key={index}
								href={social.href}
								aria-label={social.label}
								className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-dark-secondary)] border border-[var(--border-dark)] text-white hover:text-[var(--accent)] transition"
							>
								{social.icon}
							</motion.a>
						))}
					</div>
					<p className="text-[var(--text-tertiary)]">
						Subscribe to our newsletter
					</p>
					<form className="mt-2 flex">
						<input
							type="email"
							placeholder="example@email.com"
							className="px-4 py-2 w-full rounded-l-lg border border-[var(--border-dark)] focus:outline-none"
						/>
						<button className="px-4 py-2 bg-[var(--accent-secondary)] rounded-r-lg">
							Subscribe
						</button>
					</form>
				</div>

				{/* Bottom */}
				<div className="border-t border-[var(--border-dark)] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-[var(--text-tertiary)]">
						© {new Date().getFullYear()} Escaza. All rights reserved.
					</p>
					<div className="flex space-x-6 mt-4 md:mt-0">
						{["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
							<a
								key={item}
								href="#"
								className="text-[var(--text-secondary)] text-sm hover:text-white transition-colors duration-300"
							>
								{item}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
