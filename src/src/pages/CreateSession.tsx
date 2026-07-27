import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useVotingContract } from '../hooks/useVotingContract';
import { PlusCircle, Loader2, AlertCircle, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateSession() {
  const { isConnected } = useWallet();
  const { createSession, isLoading } = useVotingContract();
  
  const [formData, setFormData] = useState({
    totalVoters: 100,
    numCandidates: 3,
    durationHours: 24,
    sessionId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    const startTime = Math.floor(Date.now() / 1000);
    const endTime = startTime + formData.durationHours * 3600;

    const sessionConfig = {
      sessionId: formData.sessionId || `session-${Date.now()}`,
      totalVoters: formData.totalVoters,
      numCandidates: formData.numCandidates,
      startTime,
      endTime,
      isActive: true,
      isTallied: false,
    };

    try {
      await createSession(sessionConfig);
      setFormData({
        totalVoters: 100,
        numCandidates: 3,
        durationHours: 24,
        sessionId: '',
      });
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="flex items-center mb-6">
          <PlusCircle className="w-8 h-8 text-midnight-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Create Voting Session</h2>
        </div>

        <p className="text-midnight-300 mb-6">
          Configure a new privacy-preserving voting session. Once created, 
          eligible voters can cast their votes anonymously.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session ID */}
          <div>
            <label className="block text-sm font-medium text-midnight-300 mb-2">
              Session ID (Optional)
            </label>
            <input
              type="text"
              value={formData.sessionId}
              onChange={(e) => setFormData({ ...formData, sessionId: e.target.value })}
              placeholder="e.g., presidential-election-2024"
              className="input-field"
            />
          </div>

          {/* Total Voters */}
          <div>
            <label className="block text-sm font-medium text-midnight-300 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Total Registered Voters
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={formData.totalVoters}
              onChange={(e) => setFormData({ ...formData, totalVoters: parseInt(e.target.value) || 0 })}
              className="input-field"
            />
            <p className="text-xs text-midnight-400 mt-1">
              Maximum number of voters who can participate
            </p>
          </div>

          {/* Number of Candidates */}
          <div>
            <label className="block text-sm font-medium text-midnight-300 mb-2">
              Number of Candidates/Options
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={formData.numCandidates}
              onChange={(e) => setFormData({ ...formData, numCandidates: parseInt(e.target.value) || 0 })}
              className="input-field"
            />
            <p className="text-xs text-midnight-400 mt-1">
              Between 2 and 10 candidates or voting options
            </p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-midnight-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Voting Duration (Hours)
            </label>
            <input
              type="number"
              min="1"
              max="720"
              value={formData.durationHours}
              onChange={(e) => setFormData({ ...formData, durationHours: parseInt(e.target.value) || 0 })}
              className="input-field"
            />
            <p className="text-xs text-midnight-400 mt-1">
              How long the voting session will remain active
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-midnight-700/30 border border-midnight-600 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-midnight-400 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-midnight-300">
                <p className="font-semibold text-white mb-1">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>You must be the session owner to end or tally results</li>
                  <li>Voters must be registered in the eligibility list</li>
                  <li>Results can only be tallied once after the session ends</li>
                  <li>All votes are private and cannot be revealed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isConnected || isLoading}
            className="btn-primary w-full py-4 text-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Session...
              </span>
            ) : (
              'Create Voting Session'
            )}
          </button>

          {!isConnected && (
            <p className="text-center text-sm text-midnight-400">
              Please connect your wallet to create a voting session
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
