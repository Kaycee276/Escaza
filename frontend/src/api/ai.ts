const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const fetchAutoComplete = async (
	inputText: string,
	inputTitle: string
) => {
	const response = await fetch(`${BACKEND_URL}/api/ai/autocomplete`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ inputText, inputTitle }),
	});

	if (!response.ok) {
		throw new Error("Failed to fetch autocomplete");
	}

	const data = await response.json();
	return data;
};
