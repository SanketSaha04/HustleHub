import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import multer from 'multer';
import path from 'path';

import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const DEV_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Helper to create JWT token
const createToken = (user) => {
    const payload = {
        id: user._id, name: user.name, email: user.email,
        jobTitle: user.jobTitle, skills: user.skills,
        experience: user.experience, resumePath: user.resumePath
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Multer config for resume uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// POST /auth/register
router.post("/register", async (req, res) => {
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

// POST /auth/login
router.post("/login", async (req, res) => {
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

// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = createToken(req.user);
    res.redirect(`${DEV_ORIGIN}/auth/callback?token=${token}`);
  }
);

// POST /api/user/resume
router.post('/user/resume', auth, upload.single('resume'), async (req, res) => {
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
        res.status(200).json({ message: 'Profile updated successfully.', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;