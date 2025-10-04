import { motion } from "framer-motion";

const testimonials = [
	{
		name: "Adebayo O.",
		school: "UNILAG",
		quote:
			"Escaza saved me 3 weeks of logbook work! The AI completion was so accurate my supervisor thought I wrote everything.",
	},
	{
		name: "Chioma N.",
		school: "UNN",
		quote:
			"I used to dread filling my logbook. Now with reminders and auto-save, it's actually enjoyable!",
	},
	{
		name: "Emeka P.",
		school: "FUTO",
		quote:
			"The PDF export is perfectly formatted exactly how my department requires. No more rejected submissions!",
	},
];

const universities = ["UNILAG", "UNN", "UI", "FUTA", "OAU", "UNIBEN"];

const Testimonials = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center mb-12">
					Trusted by IT Students Across Nigeria
				</h2>

				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							viewport={{ once: true, amount: 0.3 }}
							className="bg-[var(--bg-secondary)] p-6 rounded-xl shadow-sm"
						>
							<div className="flex items-center mb-4">
								<motion.div
									whileHover={{ scale: 1.1 }}
									className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold"
								>
									{testimonial.name.charAt(0)}
								</motion.div>
								<div className="ml-4">
									<h4 className="font-semibold">{testimonial.name}</h4>
									<p className="text-[var(--text-tertiary)] text-sm">
										{testimonial.school}
									</p>
								</div>
							</div>
							<p className="text-[var(--text-secondary)] italic">
								"{testimonial.quote}"
							</p>
						</motion.div>
					))}
				</div>

				{/* University Badges */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					viewport={{ once: true, amount: 0.2 }}
					className="mt-12 flex flex-wrap justify-center gap-4"
				>
					{universities.map((school, index) => (
						<div
							key={index}
							className="px-4 py-2 bg-[var(--bg-tertiary)] rounded-full text-[var(--text-tertiary)]"
						>
							{school}
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Testimonials;
