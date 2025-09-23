import express from 'express';
// Make sure the controller is also using named exports correctly
import { getHackathons } from '../controllers/hackathonController.js';

const router = express.Router();

router.get('/', getHackathons);

// This is the crucial line. It makes the 'router' the default thing
// that gets exported from this file.
export default router;