import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Helper to create a static token for the admin
const createAdminToken = () => {
    const adminPayload = {
        id: 'admin_user', // Static ID for the admin
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        role: 'admin'
    };
    return jwt.sign(adminPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// POST /api/admin/login
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if the admin credentials are set in the .env file
    if (!adminEmail || !adminPassword) {
        console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the .env file.");
        return res.status(500).json({ message: "Server configuration error." });
    }

    // Check if the provided credentials match the environment variables
    if (email === adminEmail && password === adminPassword) {
        const token = createAdminToken();
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;