const express = require("express");
const axios = require("axios");
const router = express.Router();

// POST /api/ai/autofill
router.post("/autofill", async (req, res) => {
	const { prompt } = req.body;
	if (!prompt) {
		return res.status(400).json({ error: "Prompt is required" });
	}

	try {
		const response = await axios.post(
			"https://api-inference.huggingface.co/models/gpt2", // Change model if needed
			{ inputs: prompt },
			{
				headers: {
					Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);
		const generated =
			response.data && response.data[0] && response.data[0].generated_text
				? response.data[0].generated_text
				: null;
		res.json({ generated });
	} catch (error) {
		console.error(
			"Hugging Face API error:",
			error.response?.data || error.message
		);
		res.status(500).json({ error: "Failed to generate text" });
	}
});

module.exports = router;
