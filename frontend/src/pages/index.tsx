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
