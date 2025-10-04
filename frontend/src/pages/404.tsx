import { Link } from "react-router-dom";

const Page404 = () => {
	return (
		<div className="min-h-screen flex-1 ">
			<h1 className="text-4xl font-bold text-[var(--text-secondary)]">
				404 - Page Not Found
			</h1>
			<p className="mt-4 ">The page you're looking for doesn't exist.</p>
			<Link to="/" className="mt-6 px-4 py-2 ">
				Go to Home
			</Link>
			<Link to="/dashboard" className="mt-4 px-4 py-2 ">
				Go to Dashboard
			</Link>
		</div>
	);
};

export default Page404;
