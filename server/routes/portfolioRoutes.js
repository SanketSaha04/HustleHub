import express from 'express';
import Project from '../models/Project.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// GET all projects for the logged-in user
router.get('/projects', auth, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST a new project
router.post('/project', auth, async (req, res) => {
    try {
        const { title, description, technologies, liveUrl, codeUrl, imageUrl } = req.body;
        const newProject = new Project({
            userId: req.user.id,
            title,
            description,
            technologies: technologies.split(',').map(t => t.trim()),
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

export default router;