import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
	{
		question: "Is my data secure with Escaza?",
		answer:
			"Absolutely. We use industry-standard encryption and your logbook data is never shared with third parties.",
	},
	{
		question: "How accurate is the AI autofill feature?",
		answer:
			"Our AI analyzes your writing style from existing entries and maintains consistency. Most students report 90-95% accuracy.",
	},
	{
		question: "Can I use Escaza for non-IT logbooks?",
		answer:
			"While optimized for IT/SIWES, Escaza works well for any structured logbook or journal requiring regular entries.",
	},
	{
		question: "What if my school has specific logbook requirements?",
		answer:
			"Our PDF export is customizable to match most institutional formats. Contact us if you have special requirements.",
	},
	{
		question: "Is there a mobile app?",
		answer:
			"Not yet, but our web app works perfectly on mobile browsers. A native app is coming soon!",
	},
];

const FAQ = () => {
	const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setActiveFAQ(activeFAQ === index ? null : index);
	};

	return (
		<section id="faq" className="py-16">
			<div className="container mx-auto px-6 max-w-3xl">
				<h2 className="text-3xl font-bold text-center mb-12">
					Frequently Asked Questions
				</h2>

				<div className="space-y-4">
					{faqs.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							viewport={{ once: true, amount: 0.3 }}
							className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden shadow-sm"
						>
							<button
								onClick={() => toggleFAQ(index)}
								className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-[var(--bg-tertiary)] transition"
								aria-expanded={activeFAQ === index}
								aria-controls={`faq-${index}`}
							>
								<h3 className="text-lg font-medium">{item.question}</h3>
								<FiPlus
									className={`w-7 h-7 text-[var(--text-secondary)] transition-transform ${
										activeFAQ === index ? "rotate-45" : ""
									}`}
								/>
							</button>

							<AnimatePresence initial={false}>
								{activeFAQ === index && (
									<motion.div
										id={`faq-${index}`}
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="px-6 pb-4 text-[var(--text-secondary)] overflow-hidden"
									>
										{item.answer}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQ;
