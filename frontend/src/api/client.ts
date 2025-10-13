const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

type RequestOptions = {
	auth?: boolean;
	headers?: Record<string, string>;
};

async function request<T>(
	path: string,
	method: string,
	body?: unknown,
	options: RequestOptions = {}
): Promise<T> {
	const headers: Record<string, string> = { ...(options.headers || {}) };

	if (body !== undefined && headers["Content-Type"] === undefined) {
		headers["Content-Type"] = "application/json";
	}

	if (options.auth !== false) {
		const token = localStorage.getItem("token");
		if (token) headers["Authorization"] = `Bearer ${token}`;
	}

	const response = await fetch(`${BASE_URL}${path}`, {
		method,
		headers,
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	const contentType = response.headers.get("content-type") || "";
	const isJson = contentType.includes("application/json");

	if (!response.ok) {
		let message = response.statusText;
		if (isJson) {
			try {
				const err = await response.json();
				message = err.message || message;
			} catch {
				// ignore JSON parse errors
			}
		}
		throw new Error(message);
	}

	if (isJson) {
		return (await response.json()) as T;
	}

	// allow void/unknown responses
	return undefined as unknown as T;
}

export const apiClient = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, "GET", undefined, options),
	post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, "POST", body, options),
	put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, "PUT", body, options),
	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, "DELETE", undefined, options),
};

export default apiClient;
