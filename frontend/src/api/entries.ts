import apiClient from "./client";

export type EntryStatus = "completed" | "draft";

export interface Entry {
	id: string;
	title: string;
	content: string;
	status: EntryStatus;
	created_at: string;
}

export const listEntries = async (
	token: string,
	query?: string
): Promise<Entry[]> => {
	const search = query ? `?query=${encodeURIComponent(query)}` : "";
	const data = await apiClient.get<{ entries: Entry[] }>(
		`/api/entries${search}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return data.entries || [];
};

export const getEntry = async (token: string, id: string): Promise<Entry> => {
	const data = await apiClient.get<{ entry: Entry }>(`/api/entries/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return data.entry as Entry;
};

export const createEntry = async (
	token: string,
	payload: { title: string; content: string; status: EntryStatus }
): Promise<Entry> => {
	const data = await apiClient.post<{ entry: Entry }>(`/api/entries`, payload, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return data.entry as Entry;
};

export const updateEntry = async (
	token: string,
	id: string,
	payload: Partial<{ title: string; content: string; status: EntryStatus }>
): Promise<Entry> => {
	const data = await apiClient.put<{ entry: Entry }>(
		`/api/entries/${id}`,
		payload,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return data.entry as Entry;
};

export const deleteEntry = async (token: string, id: string): Promise<void> => {
	await apiClient.delete<void>(`/api/entries/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
