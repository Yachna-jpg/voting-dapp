import { Request, Response } from 'express';

// In-memory storage (replace with database in production)
let voteCounts = {
  counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  totalVotes: 0,
};

let votedCommitments: string[] = [];

/**
 * Get current vote counts
 */
export const getVoteCounts = async (req: Request, res: Response) => {
  try {
    // In production, fetch from the smart contract
    res.json(voteCounts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Cast a vote
 */
export const castVote = async (req: Request, res: Response) => {
  try {
    const { candidateIndex, voterCredentials, ballot, eligibilityProof, contractAddress } = req.body;

    // Validate inputs
    if (!candidateIndex || candidateIndex < 0) {
      return res.status(400).json({ message: 'Invalid candidate index' });
    }

    if (!contractAddress) {
      return res.status(400).json({ message: 'Contract address required' });
    }

    // In production, this would:
    // 1. Verify the zero-knowledge proof
    // 2. Check voter eligibility
    // 3. Verify voter hasn't already voted
    // 4. Submit the vote to the smart contract
    
    // For now, simulate vote casting
    const voterCommitment = `commitment-${Date.now()}`;
    
    // Check if already voted
    if (votedCommitments.includes(voterCommitment)) {
      return res.status(400).json({ message: 'Voter has already voted' });
    }

    // Update vote counts
    voteCounts.counts[candidateIndex]++;
    voteCounts.totalVotes++;
    votedCommitments.push(voterCommitment);

    res.json({
      success: true,
      message: 'Vote cast successfully',
      voteCounts,
    });
  } catch (error: any) {
    console.error('Error casting vote:', error);
    res.status(500).json({ message: error.message });
  }
};
