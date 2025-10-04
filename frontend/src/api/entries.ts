const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

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
	const url = new URL(`${BACKEND_URL}/api/entries`);
	if (query) url.searchParams.append("query", query);

	const res = await fetch(url.toString(), {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!res.ok) throw new Error("Failed to load entries");
	const data = await res.json();
	return data.entries || [];
};

export const getEntry = async (token: string, id: string): Promise<Entry> => {
	const res = await fetch(`${BACKEND_URL}/api/entries/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) throw new Error("Failed to load entry");
	const data = await res.json();
	return data.entry as Entry;
};

export const createEntry = async (
	token: string,
	payload: { title: string; content: string; status: EntryStatus }
): Promise<Entry> => {
	const res = await fetch(`${BACKEND_URL}/api/entries`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("Failed to save entry");
	const data = await res.json();
	return data.entry as Entry;
};

export const updateEntry = async (
	token: string,
	id: string,
	payload: Partial<{ title: string; content: string; status: EntryStatus }>
): Promise<Entry> => {
	const res = await fetch(`${BACKEND_URL}/api/entries/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("Failed to update entry");
	const data = await res.json();
	return data.entry as Entry;
};

export const deleteEntry = async (token: string, id: string): Promise<void> => {
	const res = await fetch(`${BACKEND_URL}/api/entries/${id}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) throw new Error("Failed to delete entry");
};
