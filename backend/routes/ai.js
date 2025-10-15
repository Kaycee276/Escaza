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

// POST /api/ai/it-plan
router.post("/it-plan", async (req, res) => {
	try {
		const { workDescription, startDate, endDate, durationDays } =
			req.body || {};

		if (!workDescription) {
			return res.status(400).json({ error: "workDescription is required" });
		}

		let start = startDate ? new Date(startDate) : undefined;
		let end = endDate ? new Date(endDate) : undefined;

		if (!start && (end || durationDays)) {
			start = new Date();
		}

		if (
			!end &&
			start &&
			durationDays &&
			Number.isFinite(Number(durationDays))
		) {
			const d = new Date(start);
			d.setDate(d.getDate() + Number(durationDays) - 1);
			end = d;
		}

		if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
			return res.status(400).json({
				error: "Valid startDate and endDate or durationDays are required",
			});
		}

		if (end < start) {
			return res.status(400).json({ error: "endDate must be after startDate" });
		}

		const planPrompt = `You are helping a student on Industrial Training (IT). Create a concise day-by-day plan for the timeframe.

		Work description: ${workDescription}
		Start date: ${start.toISOString().split("T")[0]}
		End date: ${end.toISOString().split("T")[0]}

		Strict formatting rules (do not add any extra text before or after):
		- For each day, FIRST write a short title (max 6 words) in the exact format:
		  Day {N}: {Title}
		- Immediately after each title, write EXACTLY two bullet points (begin each with "- ") describing actions for that day.
		- Each bullet must be <= 18 words, practical, and tailored to the work description.
		- Use proper punctuation and capitalization. Avoid filler, repetition, or generic fluff.

		Example (structure only):
		Day 1: Setup Environment
		- Install dependencies and verify project builds locally.
		- Configure linters and formatters; run initial quality checks.

		Day 2: Feature Scaffolding
		- Create base components with placeholder content.
		- Set up state management and routing stubs.`;

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: planPrompt,
			config: {
				systemInstruction:
					"You are a helpful assistant that helps people write personal logbook entries.",
			},
		});

		const dates = [];
		const cursor = new Date(start);
		while (cursor <= end) {
			dates.push(cursor.toISOString().split("T")[0]);
			cursor.setDate(cursor.getDate() + 1);
		}

		const rawText = response.text || "";

		// Parse: Day N: Title + exactly two bullets following
		const lines = rawText
			.split(/\r?\n/)
			.map((l) => l.trim())
			.filter((l) => l.length > 0);

		const parsed = [];
		for (let i = 0; i < lines.length; i++) {
			const m = lines[i].match(/^Day\s*\d+\s*:\s*(.+)$/i);
			if (m) {
				const title = m[1].trim();
				let bulletsForDay = [];
				let j = i + 1;
				while (j < lines.length && bulletsForDay.length < 2) {
					const bm = lines[j].match(/^[-*]\s+(.+)$/);
					if (bm) bulletsForDay.push(bm[1].trim());
					else break;
					j++;
				}
				if (bulletsForDay.length > 0) {
					parsed.push({ title, content: bulletsForDay.join("\n") });
				}
			}
		}

		const overallTitle = `IT Plan: ${String(workDescription).slice(0, 60)}`;
		const entries = dates.map((d, i) => {
			const p = i < parsed.length ? parsed[i] : undefined;
			return {
				date: d,
				title: p?.title || `Day ${i + 1}`,
				content: p?.content || "",
			};
		});

		return res.json({
			planMarkdown: rawText,
			startDate: dates[0],
			endDate: dates[dates.length - 1],
			dates,
			title: overallTitle,
			entries,
		});
	} catch (error) {
		console.error("Error generating IT plan:", error);
		return res.status(500).json({ error: "Failed to generate IT plan" });
	}
});

export default router;
