import express from "express";
import supabase from "../utils/supabase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/entries
 * List entries for the authenticated user
 */
router.get("/", authenticateToken, async (req, res) => {
	try {
		const { data, error } = await supabase
			.from("entries")
			.select("id, title, content, status, created_at")
			.eq("user_id", req.user.userId)
			.order("created_at", { ascending: false });

		if (error) {
			return res
				.status(500)
				.json({ error: "Failed to fetch entries", message: error.message });
		}

		res.json({ success: true, entries: data || [] });
	} catch (err) {
		console.error("List entries error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * GET /api/entries/:id
 * Get a single entry for the authenticated user
 */
router.get("/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { data, error } = await supabase
			.from("entries")
			.select("id, title, content, status, created_at")
			.eq("id", id)
			.eq("user_id", req.user.userId)
			.single();

		if (error || !data) {
			return res.status(404).json({ error: "Entry not found" });
		}

		res.json({ success: true, entry: data });
	} catch (err) {
		console.error("Get entry error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * PUT /api/entries/:id
 * Update an entry
 */
router.put("/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content, status } = req.body;

		if (!title && !content && !status) {
			return res.status(400).json({ error: "Nothing to update" });
		}

		const updates = {};
		if (typeof title === "string") updates.title = title;
		if (typeof content === "string") updates.content = content;
		if (status === "draft" || status === "completed") updates.status = status;

		const { data, error } = await supabase
			.from("entries")
			.update(updates)
			.eq("id", id)
			.eq("user_id", req.user.userId)
			.select("id, title, content, status, created_at")
			.single();

		if (error || !data) {
			return res
				.status(404)
				.json({ error: "Update failed or entry not found" });
		}

		res.json({ success: true, entry: data });
	} catch (err) {
		console.error("Update entry error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * POST /api/entries
 * Create a new entry
 */
router.post("/", authenticateToken, async (req, res) => {
	try {
		const { title, content, status } = req.body;

		if (!title || !content) {
			return res.status(400).json({ error: "Title and content are required" });
		}

		const newEntry = {
			user_id: req.user.userId,
			title,
			content,
			status: status === "draft" ? "draft" : "completed",
			created_at: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("entries")
			.insert([newEntry])
			.select("id, title, content, status, created_at")
			.single();

		if (error) {
			return res
				.status(500)
				.json({ error: "Failed to create entry", message: error.message });
		}

		res.status(201).json({ success: true, entry: data });
	} catch (err) {
		console.error("Create entry error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * DELETE /api/entries/:id
 * Delete an entry
 */
router.delete("/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;

		const { data, error } = await supabase
			.from("entries")
			.delete()
			.eq("id", id)
			.eq("user_id", req.user.userId)
			.select();

		if (error) {
			return res
				.status(500)
				.json({ error: "Failed to delete entry", message: error.message });
		}

		if (!data || data.length === 0) {
			return res.status(404).json({ error: "Entry not found" });
		}

		res.json({ success: true, message: "Entry deleted successfully" });
	} catch (err) {
		console.error("Delete entry error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
