import express from "express";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Import configurations and routes
import passportConfig from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Import admin routes
import gigRoutes from './routes/gigRoutes.js';
import contractRoutes from './routes/contractRoutes.js'; 
import adminApiRoutes from './routes/adminApiRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// --- Middleware Setup ---
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
const DEV_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: DEV_ORIGIN, credentials: true }));

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadsDir));

// Session and Passport Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'a-secure-default-secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// --- API Routes ---
app.use("/auth", authRoutes); // Includes /register, /login, /google, etc.
app.use("/api", authRoutes); // For /api/user/resume
app.use("/api/portfolio", portfolioRoutes);
app.use("/api", interviewRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/admin", adminRoutes); // Add admin routes
app.use("/api/gigs", gigRoutes); 
app.use('/api/contracts', contractRoutes);
app.use('/api/admin-api', adminApiRoutes);
app.use('/api/notifications', notificationRoutes);

// --- Database Connection and Server Start ---
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully.");
        // **CORRECTED: Start the server ONLY after the DB connection is successful**
        app.listen(PORT, () => console.log(`HustleHub API running at http://localhost:${PORT}`));
    })
    .catch(err => console.error("MongoDB connection error:", err));