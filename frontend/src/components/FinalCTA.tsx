import SignUpBtn from "../common/SignUpBtn";
import { motion } from "framer-motion";

const FinalCTA = () => {
	return (
		<section className="py-16 bg-[var(--accent-secondary)] text-white">
			<div className="container mx-auto px-6 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-3xl font-bold mb-6"
				>
					Ready to Transform Your IT Experience?
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
				>
					Join thousands of Nigerian students who've made logbooks stress-free
					with Escaza
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex flex-col sm:flex-row justify-center items-center gap-4"
				>
					<SignUpBtn />
					<button className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-[var(--accent-secondary)] transition font-medium text-lg">
						See Demo
					</button>
				</motion.div>
			</div>
		</section>
	);
};

export default FinalCTA;
