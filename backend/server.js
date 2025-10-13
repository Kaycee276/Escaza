import "./loadEnv.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

// Routes import
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import entriesRoutes from "./routes/entries.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(
	helmet({
		crossOriginResourcePolicy: { policy: "cross-origin" },
	})
);

// Response compression
app.use(
	compression({
		threshold: 1024,
	})
);

app.set("trust proxy", 1); // Trust first proxy
app.disable("x-powered-by"); // Hide Express usage

// Rate limiting
// const authLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000,
// 	max: 10,
// 	message: "Too many login attempts. Try again in 15 minutes.",
// });

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 500,
	message: "Too many API requests. Try again later.",
});

const aiLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 20,
	message: "Too many requests to AI service. Try again later.",
});

// app.use("/api/auth", authLimiter);
app.use("/api", apiLimiter);
app.use("/api/ai", aiLimiter);

// CORS configuration
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:4096",
		credentials: true,
	})
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		uptime: process.uptime(),
		timestamp: new Date(),
		message: "Server is healthy",
	});
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/entries", entriesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	const status = err.statusCode || 500;
	res.status(status).json({
		error: err.name || "Error",
		message:
			process.env.NODE_ENV === "development"
				? err.message
				: "Internal server error",
	});
});

// 404 handler
app.use("*", (req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Health check: http://localhost:${PORT}/health`);
});

process.on("SIGTERM", () => {
	console.log("SIGTERM received. Shutting down gracefully...");
	server.close(() => {
		console.log("Server closed. Exiting process...");
		process.exit(0);
	});
});
