import express from 'express';
import Gig from '../models/Gig.js';
import multer from 'multer';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Multer setup for file uploads (optional)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'gig-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// POST /api/gigs - Create a new gig
router.post('/', auth, upload.single('attachment'), async (req, res) => {
    try {
        const { title, category, skills, description, budget, duration } = req.body;
        
        const newGig = new Gig({
            title,
            category,
            skills: skills.split(',').map(skill => skill.trim()),
            description,
            budget,
            duration,
            attachment: req.file ? `/uploads/${req.file.filename}` : null
        });

        await newGig.save();
        res.status(201).json(newGig);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /api/gigs - Get all gigs
router.get('/', async (req, res) => {
    try {
        const gigs = await Gig.find().sort({ createdAt: -1 });
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;