import { useState, useEffect } from "react";
import { listEntries } from "../api/entries";
import type { Entry } from "../api/entries";
import { useNavigate } from "react-router-dom";

export const useEntries = () => {
	const [entries, setEntries] = useState<Entry[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEntries = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem("token");
				if (!token) {
					navigate("/signin");
					return;
				}
				const data = await listEntries(token);
				setEntries(data);
			} catch (e: unknown) {
				const message =
					e instanceof Error ? e.message : "Failed to load entries";
				setError(message);
			} finally {
				setLoading(false);
			}
		};
		fetchEntries();
	}, [navigate]);

	return { entries, loading, setEntries, error };
};
