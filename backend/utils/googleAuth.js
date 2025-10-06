import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verify Google ID token
 * @param {string} token - The Google ID token
 * @returns {Promise<Object>} - The verified token payload
 */
export const verifyGoogleToken = async (token) => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		return {
			success: true,
			payload: {
				googleId: payload.sub,
				email: payload.email,
				name: payload.name,
				picture: payload.picture,
				emailVerified: payload.email_verified,
			},
		};
	} catch (error) {
		console.error("Google token verification failed:", error);
		return {
			success: false,
			error: "Invalid Google token",
		};
	}
};
