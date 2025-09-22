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
import mongoose from "mongoose";
import multer from 'multer';
import path from 'path';
import { auth } from './middleware/auth.js';
import fs from 'fs';

dotenv.config();

const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected successfully."))
.catch(err => console.error("MongoDB connection error:", err));

// --- NEW: Project Model ---
const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    liveUrl: { type: String },
    codeUrl: { type: String },
    imageUrl: { type: String }, // You can expand this later to handle image uploads
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    jobTitle: { type: String },
    skills: { type: [String] },
    experience: { type: String },
    resumePath: { type: String }
});

const User = mongoose.model("User", userSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
const DEV_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: DEV_ORIGIN, credentials: true }));
app.use('/uploads', express.static('uploads'));

app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: email,
            });
            await newUser.save();
            return done(null, newUser);
        }
    } catch (err) {
        return done(err, null);
    }
  }
));

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        jobTitle: user.jobTitle,
        skills: user.skills,
        experience: user.experience,
        resumePath: user.resumePath
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.password) return res.status(400).json({ message: "Please log in with Google." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = createToken(req.user);
    res.redirect(`${DEV_ORIGIN}/auth/callback?token=${token}`);
  }
);

app.post('/api/user/resume', auth, upload.single('resume'), async (req, res) => {
    try {
        const { jobTitle, fullName, skills, experience } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.name = fullName || user.name;
        user.jobTitle = jobTitle;
        user.skills = skills ? skills.split(',').map(skill => skill.trim()) : [];
        user.experience = experience;
        if (req.file) {
            user.resumePath = `/uploads/${req.file.filename}`;
        }

        await user.save();
        const token = createToken(user);

        res.status(200).json({ 
            message: 'Profile and resume updated successfully.',
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



// --- UPDATED INTERVIEW PREP API ROUTE ---
app.get("/api/interview-prep", (req, res) => {
  const interviewData = [
    {
      category: "Data Structures & Algorithms",
      description: "The absolute core of any software engineering technical interview. Mastering these topics is essential for problem-solving.",
      playlistId: "PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz", // Striver's A2Z DSA Playlist
      topics: [
        { name: "Arrays & Strings", details: "Understand contiguous memory, traversal, and manipulation techniques." },
        { name: "Linked Lists", details: "Grasp pointers, nodes, and the trade-offs versus arrays." },
        { name: "Stacks & Queues", details: "Learn LIFO and FIFO principles, essential for many algorithms." },
        { name: "Trees & Graphs", details: "Explore non-linear data storage, traversal algorithms (BFS, DFS), and complex problem modeling." },
        { name: "Dynamic Programming", details: "Master the art of breaking down complex problems into simpler, overlapping subproblems." },
      ]
    },
    {
      category: "System Design",
      description: "For mid-to-senior roles, you'll be asked to design large-scale systems. Focus on trade-offs and justifications for your choices.",
      // --- THIS HAS BEEN CHANGED ---
      playlistId: "PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX", // Gaurav Sen's System Design Playlist
      topics: [
        { name: "Scalability Concepts", details: "Discuss vertical vs. horizontal scaling and when to use each." },
        { name: "Load Balancing & Caching", details: "Explain how to distribute traffic and store frequently accessed data to reduce latency." },
        { name: "Database Design", details: "Compare SQL and NoSQL databases and design schemas for different applications." },
        { name: "API Design", details: "Understand the principles of RESTful APIs and modern alternatives like GraphQL." },
      ]
    },
    {
      category: "Behavioral Questions",
      description: "It’s not just about what you know, but how you work. Prepare stories using the STAR method (Situation, Task, Action, Result).",
      // --- THIS HAS BEEN CHANGED ---
      videoId: "K4mDzReyT6g", // New Behavioral Questions Video
      topics: [
        { name: "Teamwork & Conflict", details: "Prepare an example of a disagreement with a team member and how you resolved it constructively." },
        { name: "Failure & Learning", details: "Be ready to discuss a project or task that failed, and more importantly, what you learned from it." },
        { name: "Leadership & Initiative", details: "Have a story about a time you took ownership of a project or mentored a teammate, even without an official title." },
        { name: "Motivation & Values", details: "Be able to clearly articulate why you are interested in this specific company and role." },
      ]
    }
  ];
  res.json(interviewData);
});
// --- END OF UPDATED ROUTE ---

// --- NEW PORTFOLIO API ROUTES ---

// GET all projects for the logged-in user
app.get('/api/portfolio/projects', auth, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST a new project
app.post('/api/portfolio/project', auth, async (req, res) => {
    try {
        const { title, description, technologies, liveUrl, codeUrl, imageUrl } = req.body;

        const newProject = new Project({
            userId: req.user.id,
            title,
            description,
            technologies: technologies.split(',').map(t => t.trim()), // Assuming comma-separated string
            liveUrl,
            codeUrl,
            imageUrl
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// --- END OF NEW ROUTES ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`HustleHub API running at http://localhost:${PORT}`));