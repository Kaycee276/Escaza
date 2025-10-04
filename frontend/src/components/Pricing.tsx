import SignUpBtn from "../common/SignUpBtn";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const plans = [
	{
		title: "Free",
		desc: "Basic features to get started",
		price: "₦0",
		highlight: false,
		btn: <SignUpBtn>Get Started</SignUpBtn>,
		features: [
			{ label: "Digital logbook entries", included: true },
			{ label: "Basic PDF export", included: true },
			{ label: "Grammar checking", included: true },
			{ label: "AI Autofill", included: false },
			{ label: "Premium templates", included: false },
		],
	},

	{
		title: "Premium",
		desc: "Complete logbook solution",
		price: "₦2,500",
		highlight: true,
		btn: (
			<button className="w-full py-3 bg-[var(--accent-secondary)] text-white rounded-lg hover:bg-blue-700 shadow-md">
				Upgrade Now
			</button>
		),
		features: [
			{ label: "Everything in Free", included: true },
			{ label: "AI Autofill after 3 months", included: true },
			{ label: "Advanced PDF customization", included: true },
			{ label: "Email reminders", included: true },
			{ label: "Priority support", included: true },
		],
	},
];

const Pricing = () => {
	return (
		<section id="pricing" className="py-16">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center mb-4">
					Simple, Affordable Pricing
				</h2>
				<p className="text-xl text-center text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto">
					Choose the plan that fits your IT duration
				</p>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							viewport={{ once: true, amount: 0.3 }}
							className={`relative p-8 rounded-xl border ${
								plan.highlight
									? "border-2 border-[var(--accent-secondary)] shadow-lg"
									: "border-[var(--border)] shadow-sm"
							} bg-[var(--bg-secondary)]`}
						>
							{/* Badge */}
							{plan.highlight && (
								<div className="absolute top-0 right-0 bg-[var(--accent-secondary)] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
									Most Popular
								</div>
							)}

							<h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
							<p className="text-[var(--text-secondary)] mb-6">{plan.desc}</p>

							<div className="mb-6">
								<span className="text-4xl font-bold">{plan.price}</span>
								<span className="text-[var(--text-tertiary)]">/semester</span>
							</div>

							<ul className="space-y-3 mb-8">
								{plan.features.map((feat, i) => (
									<li
										key={i}
										className={`flex items-center ${
											!feat.included && "text-[var(--text-tertiary)]"
										}`}
									>
										{feat.included ? (
											<FaCheckCircle className="text-[var(--success)] mr-2" />
										) : (
											<FaTimesCircle className="text-[var(--text-tertiary)] mr-2" />
										)}
										{feat.label}
									</li>
								))}
							</ul>

							{plan.btn}
						</motion.div>
					))}
				</div>

				<p className="text-center text-[var(--text-secondary)] mt-8">
					Group discounts available for departments and schools.{" "}
					<a
						href="#"
						className="text-[var(--accent-secondary)] hover:underline"
					>
						Contact us
					</a>
				</p>
			</div>
		</section>
	);
};

export default Pricing;
