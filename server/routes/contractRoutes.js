import express from 'express';
import Contract from '../models/Contract.js';
import Gig from '../models/Gig.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contracts - Apply for a gig
router.post('/', auth, async (req, res) => {
    try {
        const { gigId } = req.body;
        const gig = await Gig.findById(gigId);

        if (!gig || gig.isAccepted) {
            return res.status(400).json({ message: 'This job is no longer available.' });
        }
        
        const existingApplication = await Contract.findOne({ gigId, userId: req.user.id });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job.' });
        }

        const newContract = new Contract({
            gigId,
            userId: req.user.id,
            status: 'Pending'
        });

        await newContract.save();
        res.status(201).json({ message: 'Application submitted successfully!', contract: newContract });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// GET /api/contracts/my-contracts
router.get('/my-contracts', auth, async (req, res) => {
    try {
        const contracts = await Contract.find({ userId: req.user.id })
            .populate('gigId')
            .sort({ createdAt: -1 });
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// --- NEW ROUTE ---
// GET /api/contracts/:id - Fetch a single contract by its ID
router.get('/:id', auth, async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id)
            .populate('gigId'); // Populate the gig details, including tasks

        if (!contract || contract.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;