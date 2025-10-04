import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `VITE_GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

/**
 * Generates autocomplete suggestions for logbook entry text
 * @param inputText - The current text in the entry
 * @returns AI-generated completion suggestion
 */
export async function autocompleteEntry(
	inputText: string,
	inputTitle: string
): Promise<string> {
	try {
		const prompt = `You are an AI assistant for a personal logbook. Based on the provided entry title and any original text, generate a concise bullet-point logbook entry. Your response should:

- Include up to two relevant and specific bullet points reflecting personal experiences, activities, or reflections connected to the title.
- Maximum of 15 words per bullet point.
- Make each bullet point clear, original, and directly related to the topic—avoid generic or vague statements.
- Expand briefly on each point (1 sentences per bullet) to add meaningful context.
- Do not invent unrealistic information; use plausible details if needed.
- Ensure the tone is friendly, thoughtful, and suitable for a private logbook.
- Avoid repeating phrases or ideas.
- Do not include any introductory or concluding text—only the bullet points.
- Format the output as a markdown list.
- Use proper punctuation and capitalization.

Title: "${inputTitle}"  
Original text: "${inputText}"

Write a logbook entry as a bulleted list (maximum 3 bullets):
`;

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				systemInstruction:
					"You are an AI assistant helping with personal logbook entries. Provide natural, helpful completions that continue the user's thoughts.",
			},
		});

		return response.text || "";
	} catch (error) {
		console.error("AI autocomplete error:", error);
		return "";
	}
}

export async function generateFullEntry(title: string): Promise<string> {
	try {
		const prompt = `Write a detailed and engaging personal logbook entry based on the title: "${title}". The entry should be reflective and insightful, suitable for a personal journal.`;

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				systemInstruction:
					"You are an AI assistant that generates thoughtful and reflective personal logbook entries based on given titles.",
			},
		});

		return response.text || "";
	} catch (error) {
		console.error("AI generate full entry error:", error);
		return "";
	}
}
