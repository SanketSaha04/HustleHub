import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const users = []; // In-memory "database"

// --- Middleware Setup ---
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
const DEV_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: DEV_ORIGIN, credentials: true }));

// --- Session and Passport Setup ---
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // This function is called after Google authenticates the user
    const email = profile.emails[0].value;
    let user = users.find(u => u.email === email);

    if (user) {
        // User exists, log them in
        return done(null, user);
    } else {
        // User does not exist, create a new user (without a password)
        const newUser = {
            id: users.length + 1,
            name: profile.displayName,
            email: email,
            password: null, // No password for OAuth users
        };
        users.push(newUser);
        return done(null, newUser);
    }
  }
));

// --- AUTHENTICATION ROUTES ---

// User Registration
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user (in-memory)
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    // Create a token with name and email in the payload
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// User Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a token with name and email in the payload
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- Google OAuth Routes ---
// 1. The route the user clicks on the frontend
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// 2. The route Google redirects back to
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, create JWT for our app
    const token = jwt.sign(
      { id: req.user.id, name: req.user.name, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Redirect back to the frontend with the token
    res.redirect(`${DEV_ORIGIN}/auth/callback?token=${token}`);
  }
);

// Server-side fetch to external API (existing route)
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
    return res.json(Array.isArray(data) ? data : []);
  } catch (e) {
    return res.status(500).json({ error: "Server error", message: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`HustleHub API running at http://localhost:${PORT}`)
);