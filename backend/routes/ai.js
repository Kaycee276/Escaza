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
	
	Write a logbook entry as a bulleted list (maximum 3 bullets):`;

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				systemInstruction:
					"You are a helpful assistant that helps people write personal logbook entries.",
				maxOutputTokens: 256,
				temperature: 0.7,
				topP: 0.95,
				frequencyPenalty: 0.0,
				presencePenalty: 0.0,
			},
		});

		return res.json({ suggestions: response.text || "" });
	} catch (error) {
		console.error("Error generating content:", error);
		return res.status(500).json({ error: "Failed to generate content" });
	}
});

export default router;
