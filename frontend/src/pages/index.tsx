import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useToastStore } from "../store/toastStore";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

const Home = () => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	const loading = useUserStore((state) => state.loading);
	const showToast = useToastStore((state) => state.showToast);

	useEffect(() => {
		if (!loading && user) {
			showToast(
				"You're already signed in. Redirecting to dashboard...",
				"info"
			);
			navigate("/dashboard", { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, user]);

	return (
		<div className="min-h-screen">
			<NavBar />
			<Hero />
			<Problem />
			<Features />
			<Testimonials />
			<HowItWorks />
			<Pricing />
			<FAQ />
			<FinalCTA />
			<Footer />
		</div>
	);
};

export default Home;
