import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const CONTRACT_ADDRESS = '0x7a3f8b9e6c4d2a1f5e8d9c0b7a6f3e4d2c1b8a9f';
// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface VotingSession {
  sessionId: string;
  totalVoters: number;
  numCandidates: number;
  startTime: number;
  endTime: number;
  isActive: boolean;
  isTallied: boolean;
}

interface VoteCounts {
  counts: number[];
  totalVotes: number;
}

export function useVotingContract() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<VotingSession | null>(null);
  const [voteCounts, setVoteCounts] = useState<VoteCounts | null>(null);

  // Fetch current session info
  const fetchSessionInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/session`);
      setSession(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching session info:', error);
      toast.error('Failed to fetch session information');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch vote counts
  const fetchVoteCounts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/votes`);
      setVoteCounts(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching vote counts:', error);
      toast.error('Failed to fetch vote counts');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Cast a vote
  const castVote = async (candidateIndex: number, voterCredentials: any, ballot: any, eligibilityProof: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/vote`, {
        candidateIndex,
        voterCredentials,
        ballot,
        eligibilityProof,
        contractAddress: CONTRACT_ADDRESS,
      });
      
      toast.success('Vote cast successfully! Your privacy is protected.');
      return response.data;
    } catch (error: any) {
      console.error('Error casting vote:', error);
      toast.error(error.response?.data?.message || 'Failed to cast vote');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new voting session
  const createSession = async (sessionConfig: Partial<VotingSession>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/session`, {
        ...sessionConfig,
        contractAddress: CONTRACT_ADDRESS,
      });
      
      toast.success('Voting session created successfully!');
      setSession(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating session:', error);
      toast.error(error.response?.data?.message || 'Failed to create session');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // End the voting session
  const endSession = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/session/end`);
      toast.success('Voting session ended');
      setSession(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error ending session:', error);
      toast.error(error.response?.data?.message || 'Failed to end session');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Tally results
  const tallyResults = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/session/tally`);
      toast.success('Results tallied successfully!');
      setSession(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error tallying results:', error);
      toast.error(error.response?.data?.message || 'Failed to tally results');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    session,
    voteCounts,
    fetchSessionInfo,
    fetchVoteCounts,
    castVote,
    createSession,
    endSession,
    tallyResults,
  };
}
