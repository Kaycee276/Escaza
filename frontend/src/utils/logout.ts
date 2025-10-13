import { useToastStore } from "../store/toastStore";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const handleLogout = async ({
	navigate,
}: {
	navigate: (path: string) => void;
}) => {
	const showToast = useToastStore.getState().showToast;
	try {
		const token = localStorage.getItem("token");
		if (token) {
			await fetch(`${BACKEND_URL}/api/auth/logout`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
		}
		showToast("Logged out successfully", "info");
	} catch (error) {
		console.error("Logout error:", error);
		showToast("Error during logout", "error");
	} finally {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
	}
};

export default handleLogout;
