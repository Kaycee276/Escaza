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

export type ITPlanResponse = {
	planMarkdown: string;
	startDate: string;
	endDate: string;
	dates: string[];
	title?: string;
	entries?: Array<{ date: string; title: string; content: string }>;
};

export const generateITPlan = async (params: {
	workDescription: string;
	startDate?: string;
	endDate?: string;
	durationDays?: number;
}) => {
	return apiClient.post<ITPlanResponse>(`/api/ai/it-plan`, params, {
		auth: false,
	});
};
