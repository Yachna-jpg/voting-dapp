import { Request, Response } from 'express';

// In-memory storage (replace with database in production)
let currentSession: any = null;

/**
 * Get current session info
 */
export const getSessionInfo = async (req: Request, res: Response) => {
  try {
    if (!currentSession) {
      return res.status(404).json({ message: 'No active session' });
    }

    // In production, fetch from the smart contract
    res.json(currentSession);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new voting session
 */
export const createSession = async (req: Request, res: Response) => {
  try {
    const {
      sessionId,
      totalVoters,
      numCandidates,
      startTime,
      endTime,
      contractAddress,
    } = req.body;

    // Validate inputs
    if (!contractAddress) {
      return res.status(400).json({ message: 'Contract address required' });
    }

    if (!totalVoters || totalVoters <= 0) {
      return res.status(400).json({ message: 'Invalid number of voters' });
    }

    if (!numCandidates || numCandidates < 2 || numCandidates > 10) {
      return res.status(400).json({ message: 'Number of candidates must be between 2 and 10' });
    }

    // In production, this would:
    // 1. Deploy/initialize the smart contract
    // 2. Register eligible voters
    // 3. Set up the voting session on-chain

    currentSession = {
      sessionId: sessionId || `session-${Date.now()}`,
      totalVoters,
      numCandidates,
      startTime: startTime || Math.floor(Date.now() / 1000),
      endTime: endTime || Math.floor(Date.now() / 1000) + 86400,
      isActive: true,
      isTallied: false,
      contractAddress,
    };

    res.json({
      success: true,
      message: 'Voting session created successfully',
      session: currentSession,
    });
  } catch (error: any) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * End the current session
 */
export const endSession = async (req: Request, res: Response) => {
  try {
    if (!currentSession) {
      return res.status(404).json({ message: 'No active session' });
    }

    if (!currentSession.isActive) {
      return res.status(400).json({ message: 'Session is not active' });
    }

    if (currentSession.isTallied) {
      return res.status(400).json({ message: 'Session has already been tallied' });
    }

    // In production, call the smart contract to end the session
    currentSession.isActive = false;

    res.json({
      success: true,
      message: 'Session ended successfully',
      session: currentSession,
    });
  } catch (error: any) {
    console.error('Error ending session:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Tally the results
 */
export const tallyResults = async (req: Request, res: Response) => {
  try {
    if (!currentSession) {
      return res.status(404).json({ message: 'No session found' });
    }

    if (currentSession.isActive) {
      return res.status(400).json({ message: 'Session is still active' });
    }

    if (currentSession.isTallied) {
      return res.status(400).json({ message: 'Results have already been tallied' });
    }

    // In production, call the smart contract to tally results
    currentSession.isTallied = true;

    res.json({
      success: true,
      message: 'Results tallied successfully',
      session: currentSession,
    });
  } catch (error: any) {
    console.error('Error tallying results:', error);
    res.status(500).json({ message: error.message });
  }
};
