import { Router } from 'express';
import { getSessionInfo, createSession, endSession, tallyResults } from '../controllers/sessionController.js';

const router = Router();

// GET /api/session - Get current session info
router.get('/', getSessionInfo);

// POST /api/session - Create a new voting session
router.post('/', createSession);

// POST /api/session/end - End the current session
router.post('/end', endSession);

// POST /api/session/tally - Tally the results
router.post('/tally', tallyResults);

export { router as sessionRoutes };
