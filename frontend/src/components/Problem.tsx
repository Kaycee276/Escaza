import { FiAlertTriangle, FiClock, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const problems = [
	{
		color: "text-[var(--error)]",
		title: "Manual Errors",
		desc: "Illegible handwriting, crossed-out mistakes, and inconsistent entries plague physical logbooks.",
		icon: <FiAlertTriangle className="w-10 h-10" />,
	},
	{
		color: "text-[var(--warning)]",
		title: "Time Consuming",
		desc: "Writing daily entries takes hours each week that could be spent on actual learning.",
		icon: <FiClock className="w-10 h-10" />,
	},
	{
		color: "text-[var(--info)]",
		title: "Formatting Issues",
		desc: "Meeting institutional requirements for layout and content is challenging.",
		icon: <FiAlertCircle className="w-10 h-10" />,
	},
];

const Problem = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl text-center text-[var(--text-secondary)] mb-12">
					From <span className="text-[var(--error)]">Frustration</span> to{" "}
					<span className="text-[var(--success)]">Perfection</span>
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{problems.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							viewport={{ once: true, amount: 0.3 }}
							className="bg-[var(--bg-secondary)] p-6 rounded-xl transition hover:shadow-lg hover:scale-[1.02]"
						>
							<div className={`${problem.color} mb-4`}>{problem.icon}</div>
							<h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
							<p className="text-[var(--text-secondary)]">{problem.desc}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Problem;
