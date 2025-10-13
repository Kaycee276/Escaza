// Add logout functionality - Logout button in navbar with proper cleanup
import { useToastStore } from "../store/toastStore";
import { useUserStore } from "../store/userStore";
import { useDashboardStore } from "../store/dashboardStore";
import apiClient from "../api/client";
const handleLogout = async ({
	navigate,
}: {
	navigate: (path: string) => void;
}) => {
	const showToast = useToastStore.getState().showToast;
	const setUser = useUserStore.getState().setUser;
	const setDashboardData = useDashboardStore.getState().setDashboardData;
	try {
		const token = localStorage.getItem("token");
		if (token) {
			await apiClient.post<{ success: boolean }>(
				"/api/auth/logout",
				undefined,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		}
		showToast("Logged out successfully", "info");
	} catch (error) {
		console.error("Logout error:", error);
		showToast("Error during logout", "error");
	} finally {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setDashboardData(null);
		navigate("/");
	}
};

export default handleLogout;
