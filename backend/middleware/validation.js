import { body, validationResult } from "express-validator";

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			error: "Validation failed",
			details: errors.array(),
		});
	}

	next();
};

/**
 * Validation rules for Google OAuth
 */
export const validateGoogleAuth = [
	body("credential")
		.notEmpty()
		.withMessage("Google credential is required")
		.isString()
		.withMessage("Credential must be a string"),
	handleValidationErrors,
];
