import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useThemeStore } from "../store/themeStore";
import { motion } from "framer-motion";
import { useToastStore } from "../store/toastStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SignIn = () => {
	const theme = useThemeStore((state) => state.theme);
	const navigate = useNavigate();
	const showToast = useToastStore((state) => state.showToast);

	return (
		<div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
			{/* Back button */}
			<motion.div
				className="mb-8 absolute top-3 left-3"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
			>
				<button
					type="button"
					onClick={() => navigate("/")}
					className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
				>
					<ChevronLeft className="w-4 h-4" />
					Back
				</button>
			</motion.div>

			<div className="w-full max-w-md">
				{/* Main card with animation */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border)] shadow-sm p-8"
				>
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-2xl font-semibold tracking-tight">
							Sign in to your account
						</h1>
						<p className="text-sm text-[var(--text-secondary)] mt-2">
							Sign in with your Google account to continue
						</p>
					</div>

					{/* Google Sign In Button */}
					<div className="space-y-4">
						<GoogleLogin
							onSuccess={async (credentialResponse) => {
								try {
									const response = await fetch(
										`${BACKEND_URL}/api/auth/google`,
										{
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify({
												credential: credentialResponse.credential,
											}),
										}
									);

									if (response.ok) {
										const data = await response.json();
										localStorage.setItem("token", data.token);
										localStorage.setItem("user", JSON.stringify(data.user));
										showToast(
											"Login Success 🎉 Redirecting to dashboard...",
											"success"
										);
										navigate("/dashboard");
									} else {
										const errorData = await response.json();
										showToast(
											`Authentication failed: ${
												errorData.message || "Unknown error"
											}`,
											"error"
										);
									}
								} catch (error) {
									console.error("Authentication failed:", error);
									showToast(
										`Authentication failed: ${
											(error as Error).message || "Unknown error"
										}`,
										"error"
									);
								}
							}}
							onError={() => {
								showToast("Google Sign In Failed", "error");
							}}
							width="100%"
							theme={theme === "dark" ? "filled_black" : "outline"}
							text="signin_with"
							shape="rectangular"
						/>
					</div>
				</motion.div>

				{/* Terms */}
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className="mt-8 text-center text-xs text-gray-500 absolute bottom-3 left-0 right-0"
				>
					By clicking continue, you agree to our{" "}
					<button className="underline hover:text-[var(--text-tertiary)] transition-colors duration-100">
						Terms of Service
					</button>{" "}
					and{" "}
					<button className="underline hover:text-[var(--text-tertiary)] transition-colors duration-100">
						Privacy Policy
					</button>
					.
				</motion.p>
			</div>
		</div>
	);
};

export default SignIn;
