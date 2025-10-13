import apiClient from "./client";

export const fetchAutoComplete = async (
	inputText: string,
	inputTitle: string
) => {
	const data = await apiClient.post<{ suggestions: string[] }>(
		`/api/ai/autocomplete`,
		{ inputText, inputTitle },
		{ auth: false }
	);
	return data;
};
