import express from 'express';
import multer from 'multer';
import Contract from '../models/Contract.js';
import { auth } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const taskUploadDir = 'uploads/tasks';
if (!fs.existsSync(taskUploadDir)) {
    fs.mkdirSync(taskUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, taskUploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `task-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

// Route for a user to submit their work for a contract
router.post(
    '/:contractId/submit',
    auth,
    upload.single('taskFile'),
    async (req, res) => {
        try {
            const contract = await Contract.findById(req.params.contractId);
            if (!contract || contract.userId.toString() !== req.user.id) {
                return res.status(404).json({ message: 'Contract not found or you are not authorized.' });
            }

            contract.submission = {
                filePath: req.file ? `/${taskUploadDir}/${req.file.filename}` : null,
                notes: req.body.notes,
                link: req.body.link,
                submittedAt: new Date()
            };
            
            await contract.save();
            res.status(200).json({ message: 'Task submitted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
);

export default router;