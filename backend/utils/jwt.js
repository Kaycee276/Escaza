import jwt from "jsonwebtoken";

/**
 * Generate JWT token
 * @param {Object} payload - The payload to encode in the token
 * @returns {string} - The generated JWT token
 */
export const generateToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || "7d",
	});
};

/**
 * Verify JWT token
 * @param {string} token - The JWT token to verify
 * @returns {Object} - The decoded payload or error
 */
export const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return {
			success: true,
			payload: decoded,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - The Authorization header
 * @returns {string|null} - The extracted token or null
 */
export const extractTokenFromHeader = (authHeader) => {
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}
	return authHeader.substring(7);
};
