import { Router } from 'express';
import { getVoteCounts, castVote } from '../controllers/voteController.js';

const router = Router();

// GET /api/votes - Get current vote counts
router.get('/', getVoteCounts);

// POST /api/votes - Cast a vote
router.post('/', castVote);

export { router as votingRoutes };
