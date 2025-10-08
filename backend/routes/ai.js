import express from "express";
import { GoogleGenAI } from "@google/genai";
const router = express.Router();

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

// POST /api/ai/autofill
router.post("/autocomplete", async (req, res) => {
	try {
		const { inputText, inputTitle } = req.body;
		if (!inputText || !inputTitle) {
			return res
				.status(400)
				.json({ error: "inputText and inputTitle are required" });
		}

		const prompt = `You are an AI assistant for a personal logbook. The provided entry title and original text may contain markdown formatting (such as lists, bold, italics, links, etc.). When generating your response:

		- Preserve any relevant markdown formatting from the input.
		- Format your output as a markdown list.
		- Include up to two relevant and specific bullet points reflecting personal experiences, activities, or reflections connected to the title.
		- Maximum of 15 words per bullet point.
		- Make each bullet point clear, original, and directly related to the topic—avoid generic or vague statements.
		- Do not invent unrealistic information; use plausible details if needed.
		- Ensure the tone is friendly, thoughtful, and suitable for a private logbook.
		- Avoid repeating phrases or ideas.
		- Do not include any introductory or concluding text—only the bullet points.
		- Use proper punctuation and capitalization.

		Title: "${inputTitle}"  
		Original text (may include markdown): "${inputText}"

		Write a logbook entry as a bulleted list (maximum 2 bullets), using markdown formatting where appropriate.`;

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				systemInstruction:
					"You are a helpful assistant that helps people write personal logbook entries.",
			},
		});

		return res.json({ suggestions: response.text || "" });
	} catch (error) {
		console.error("Error generating content:", error);
		return res.status(500).json({ error: "Failed to generate content" });
	}
});

export default router;
