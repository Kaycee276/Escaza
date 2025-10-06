import express from "express";
import supabase from "../utils/supabase.js";
import { verifyGoogleToken } from "../utils/googleAuth.js";
import { generateToken } from "../utils/jwt.js";
import { authenticateToken } from "../middleware/auth.js";
import { validateGoogleAuth } from "../middleware/validation.js";

const router = express.Router();

/**
 * POST /api/auth/google
 * Authenticate user with Google OAuth
 */
router.post("/google", validateGoogleAuth, async (req, res) => {
	try {
		const { credential } = req.body;

		// Verify Google token
		const verificationResult = await verifyGoogleToken(credential);

		if (!verificationResult.success) {
			return res.status(401).json({
				error: "Authentication failed",
				message: verificationResult.error,
			});
		}

		const { googleId, email, name, picture, emailVerified } =
			verificationResult.payload;

		// Upsert user in Supabase
		const { data: user, error } = await supabase
			.from("users")
			.upsert(
				[
					{
						id: googleId,
						email,
						name,
						picture,
						email_verified: emailVerified,
						last_login: new Date().toISOString(),
					},
				],
				{ onConflict: ["id"] }
			)
			.select()
			.single();

		if (error || !user) {
			return res.status(500).json({
				error: "Database error",
				message: error ? error.message : "User upsert failed",
			});
		}

		// Generate JWT token
		const token = generateToken({
			userId: user.id,
			email: user.email,
			name: user.name,
		});

		res.json({
			success: true,
			message: "Authentication successful",
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				picture: user.picture,
				emailVerified: user.email_verified,
				createdAt: user.created_at,
				lastLogin: user.last_login,
			},
		});
	} catch (error) {
		console.error("Google authentication error:", error);
		res.status(500).json({
			error: "Authentication failed",
			message: "Internal server error",
		});
	}
});

/**
 * GET /api/auth/me
 * Get current user information
 */
router.get("/me", authenticateToken, async (req, res) => {
	try {
		const { data: user, error } = await supabase
			.from("users")
			.select("*")
			.eq("id", req.user.userId)
			.single();

		if (error || !user) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		res.json({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				picture: user.picture,
				emailVerified: user.email_verified,
				createdAt: user.created_at,
				lastLogin: user.last_login,
			},
		});
	} catch (error) {
		console.error("Get user error:", error);
		res.status(500).json({
			error: "Failed to get user information",
			message: "Internal server error",
		});
	}
});

/**
 * POST /api/auth/logout
 * Logout user (client-side token removal)
 */
router.post("/logout", authenticateToken, (req, res) => {
	res.json({
		success: true,
		message: "Logout successful",
	});
});

/**
 * GET /api/auth/verify
 * Verify if token is valid
 */
router.get("/verify", authenticateToken, (req, res) => {
	res.json({
		success: true,
		message: "Token is valid",
		user: req.user,
	});
});

export default router;
