const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export const fetchUser = async (token: string) => {
	const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		throw new Error("Failed to fetch user");
	}
	const data = await response.json();
	return data;
};
