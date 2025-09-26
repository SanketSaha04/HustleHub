import express from 'express';
import Contract from '../models/Contract.js';
import Gig from '../models/Gig.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// --- Main Admin Routes ---

// GET /api/admin-api/contracts - Fetch all contracts for the admin view
router.get('/contracts', auth, async (req, res) => {
    try {
        const contracts = await Contract.find({})
            .populate('gigId', 'title budget')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// PATCH /api/admin-api/contracts/:id/approve - Approve a contract application
router.patch('/contracts/:id/approve', auth, async (req, res) => {
    try {
        const contractToApprove = await Contract.findById(req.params.id).populate('gigId');

        if (!contractToApprove) {
            return res.status(404).json({ message: 'Contract not found.' });
        }
        if (contractToApprove.gigId.isAccepted) {
            return res.status(400).json({ message: 'This gig has already been assigned to another user.' });
        }

        // 1. Update the winning contract and the gig
        contractToApprove.status = 'Active';
        const gig = contractToApprove.gigId;
        gig.isAccepted = true;

        // 2. Find and cancel other pending applications for the same gig
        const otherApplications = await Contract.find({ 
            gigId: gig._id, 
            status: 'Pending',
            _id: { $ne: contractToApprove._id } // Exclude the winner
        });
        
        const cancellationPromises = otherApplications.map(app => {
            app.status = 'Cancelled';
            return app.save();
        });

        // 3. Create notifications for everyone involved
        const approvedNotification = new Notification({
            userId: contractToApprove.userId,
            message: `Congratulations! Your application for "${gig.title}" has been approved.`,
            link: '/my-profile'
        });

        const rejectionNotifications = otherApplications.map(app => ({
            userId: app.userId,
            message: `Your application for "${gig.title}" was not selected as the position has been filled.`,
            link: '/oppurtunities'
        }));

        // 4. Save all changes to the database
        await Promise.all([
            contractToApprove.save(),
            gig.save(),
            ...cancellationPromises,
            Notification.create(approvedNotification),
            Notification.insertMany(rejectionNotifications)
        ]);

        res.status(200).json({ message: 'Contract approved and other applicants notified.' });
    } catch (error) {
        console.error("Approval Error:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// GET /api/admin-api/reports - Fetch aggregated data for reports
router.get('/reports', auth, async (req, res) => {
    try {
        const totalContracts = await Contract.countDocuments({ status: 'Active' });
        const totalGigs = await Gig.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'user' });

        const gigs = await Gig.find({ isAccepted: true });
        const totalBudgetValue = gigs.reduce((acc, gig) => acc + parseFloat(gig.budget || 0), 0);

        res.status(200).json({
            totalContracts,
            totalGigs,
            totalUsers,
            totalBudgetValue,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;