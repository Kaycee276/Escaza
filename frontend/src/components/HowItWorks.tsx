import { motion } from "framer-motion";

const steps = [
	{
		number: "1",
		title: "Sign Up & Start",
		desc: "Create your free account and begin your digital logbook",
	},
	{
		number: "2",
		title: "Add Your Entries",
		desc: "Fill in your daily/weekly activities with our smart editor",
	},
	{
		number: "3",
		title: "Export & Submit",
		desc: "Download perfectly formatted PDF when ready to submit",
	},
];

const HowItWorks = () => {
	return (
		<section id="how-it-works" className="py-16 bg-[var(--accent-secondary)]">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl text-blue-100 font-bold text-center mb-4">
					How Escaza Works
				</h2>
				<p className="text-xl text-center text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto">
					Transform your IT documentation in just 3 simple steps
				</p>

				<div className="relative">
					{/* Horizontal line for desktop */}
					<div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[var(--accent)] transform -translate-y-1/2 z-0" />

					{/* Steps */}
					<div className="grid md:grid-cols-3 gap-8 relative z-10">
						{steps.map((step, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								viewport={{ once: true, amount: 0.3 }}
								className="bg-[var(--bg-secondary)] p-6 rounded-xl text-center border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="w-16 h-16 my-accent-bg-reverse text-[var(--accent)] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
									{step.number}
								</div>
								<h3 className="text-xl font-semibold mb-2">{step.title}</h3>
								<p>{step.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
