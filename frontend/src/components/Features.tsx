import {
	FiCpu,
	FiDownloadCloud,
	FiBell,
	FiEdit3,
	FiCalendar,
	FiLock,
} from "react-icons/fi";
import { motion } from "framer-motion";

const features = [
	{
		icon: <FiCpu className="w-10 h-10" />,
		title: "AI-Powered Autofill",
		desc: "After 2 months of entries, our AI completes your logbook in your writing style",
	},
	{
		icon: <FiDownloadCloud className="w-10 h-10" />,
		title: "One-Click PDF Export",
		desc: "Perfectly formatted logbooks ready for submission in seconds",
	},
	{
		icon: <FiBell className="w-10 h-10" />,
		title: "Smart Reminders",
		desc: "Never miss an entry with email and app notifications",
	},
	{
		icon: <FiEdit3 className="w-10 h-10" />,
		title: "Grammar Check",
		desc: "Real-time suggestions to improve your writing quality",
	},
	{
		icon: <FiCalendar className="w-10 h-10" />,
		title: "Backdated Entries",
		desc: "Forgot a day? Add entries for past dates without hassle",
	},
	{
		icon: <FiLock className="w-10 h-10" />,
		title: "Secure Storage",
		desc: "Your data is encrypted and accessible only to you",
	},
];

const Features = () => {
	return (
		<section id="features" className="py-16">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center mb-4">
					Smart Features for Smart Students
				</h2>
				<p className="text-xl text-center text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto">
					Escaza combines AI intelligence with intuitive design to revolutionize
					your IT experience
				</p>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true, amount: 0.3 }}
							className="bg-[var(--bg-secondary)] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[var(--border)]"
						>
							<div className="text-[var(--primary)] mb-4">{feature.icon}</div>
							<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
							<p className="text-[var(--text-secondary)]">{feature.desc}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
