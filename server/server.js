import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import fetch from "node-fetch";

console.log("--- THIS IS THE SERVER.JS FILE THAT IS RUNNING ---");

const app = express();

// Basic hardening + logging
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// CORS: allow Vite dev server (tighten in production)
const DEV_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: DEV_ORIGIN,
    credentials: true,
  })
);

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the HustleHub API");
});


// Server-side fetch to external API
app.get("/api/contests", async (_req, res) => {
  try {
    const response = await fetch("https://api.github.com/events", {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return res
        .status(502)
        .json({ error: "Upstream failure", status: response.status });
    }

    const data = await response.json();
    // Ensure it's an array to keep client stable
    return res.json(Array.isArray(data) ? data : []);
  } catch (e) {
    return res.status(500).json({ error: "Server error", message: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`HustleHub API running at http://localhost:${PORT}`)
);
