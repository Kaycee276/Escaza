import { Link } from "react-router-dom";

const SignUpBtn = ({ children = "Sign Up Free" }) => {
	return (
		<Link
			to="/sign-in"
			className="px-6 py-2.5 my-accent-bg  rounded-xl shadow-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 grid place-items-center"
		>
			{children}
		</Link>
	);
};

export default SignUpBtn;
