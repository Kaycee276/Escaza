const { verifyToken, extractTokenFromHeader } = require("../utils/jwt");

/**
 * Middleware to authenticate JWT tokens
 */
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = extractTokenFromHeader(authHeader);

	if (!token) {
		return res.status(401).json({
			error: "Access denied. No token provided.",
		});
	}

	const result = verifyToken(token);

	if (!result.success) {
		return res.status(403).json({
			error: "Invalid token.",
			message: result.error,
		});
	}

	// Add user info to request object
	req.user = result.payload;
	next();
};

/**
 * Optional authentication middleware
 * Doesn't fail if no token is provided
 */
const optionalAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = extractTokenFromHeader(authHeader);

	if (token) {
		const result = verifyToken(token);
		if (result.success) {
			req.user = result.payload;
		}
	}

	next();
};

module.exports = {
	authenticateToken,
	optionalAuth,
};
