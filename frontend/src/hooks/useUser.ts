import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface UserData {
	id: string;
	email: string;
	name: string;
	picture: string;
	emailVerified: boolean;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const useUser = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			setUser(null);
			return;
		}

		const fetchUser = async () => {
			try {
				const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch user");
				}
				const data = await response.json();
				setUser(data.user);
			} catch (error) {
				console.error("Error fetching user data:", error);
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				navigate("/signin");
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [navigate]);

	return { user, loading };
};
