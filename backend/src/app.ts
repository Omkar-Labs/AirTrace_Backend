import express, { Express } from "express";
import cors from "cors";
import { env } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";
import { optionalAuthMiddleware } from "./middleware/auth.middleware.js";

export function createApp(): Express {
  const app = express();

  // CORS Configuration
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
  );

  // Body Parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Attach session context optionally on all requests
  app.use(optionalAuthMiddleware);

  // ─── Health Check Endpoint ──────────────────────────────────────
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      message: "BreatheWise / AirTrace API is healthy and operational",
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(process.uptime())}s`,
      environment: process.env.NODE_ENV,
    });
  });

  // Mount API Router on /api
  app.use("/api", apiRoutes);

  // 404 & Error Handling Middlewares (Must be mounted last)
  app.use(notFoundHandler);
  app.use(errorHandler);


  return app;
}

export default createApp;
