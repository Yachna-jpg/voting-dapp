import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useVotingContract } from '../hooks/useVotingContract';
import { Vote as VoteIcon, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Vote() {
  const { isConnected } = useWallet();
  const { session, voteCounts, fetchSessionInfo, isLoading } = useVotingContract();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const candidates = session 
    ? Array.from({ length: session.numCandidates }, (_, i) => ({
        id: i,
        name: `Candidate ${String.fromCharCode(65 + i)}`,
      }))
    : [];

  const handleVote = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (selectedCandidate === null) {
      toast.error('Please select a candidate');
      return;
    }

    if (!session) {
      toast.error('No active voting session');
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real implementation, this would:
      // 1. Generate voter credentials
      // 2. Create the ballot with zero-knowledge proof
      // 3. Generate eligibility proof
      // 4. Submit to the contract
      
      // For now, we'll simulate the vote casting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Vote cast successfully! Your privacy is protected.');
      setSelectedCandidate(null);
      fetchSessionInfo();
    } catch (error) {
      console.error('Error casting vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <AlertCircle className="w-16 h-16 text-midnight-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">No Active Session</h2>
        <p className="text-midnight-300 mb-8">
          There is currently no active voting session. Please check back later or 
          create a new voting session.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Session Info */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <VoteIcon className="w-6 h-6 mr-2 text-midnight-400" />
            Active Voting Session
          </h2>
          <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
            Active
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-midnight-300">
          <div>
            <p className="text-sm">Total Voters</p>
            <p className="text-2xl font-bold text-white">{session.totalVoters}</p>
          </div>
          <div>
            <p className="text-sm">Candidates</p>
            <p className="text-2xl font-bold text-white">{session.numCandidates}</p>
          </div>
          <div>
            <p className="text-sm">Votes Cast</p>
            <p className="text-2xl font-bold text-white">
              {voteCounts?.totalVotes || 0}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-midnight-700">
          <div className="flex items-center justify-between text-sm text-midnight-400">
            <span>Ends in:</span>
            <span className="text-white font-mono">
              {new Date(session.endTime).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Voting Interface */}
      <div className="card">
        <h3 className="text-xl font-bold text-white mb-6">Cast Your Vote</h3>
        
        <div className="space-y-4 mb-8">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedCandidate === candidate.id
                  ? 'border-midnight-500 bg-midnight-500/10'
                  : 'border-midnight-700 hover:border-midnight-600'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedCandidate === candidate.id
                      ? 'border-midnight-500 bg-midnight-500'
                      : 'border-midnight-600'
                  }`}
                >
                  {selectedCandidate === candidate.id && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-lg text-white">{candidate.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleVote}
            disabled={!isConnected || selectedCandidate === null || isLoading || isSubmitting}
            className="btn-primary flex-1 py-4 text-lg"
          >
            {isLoading || isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Vote...
              </span>
            ) : (
              'Submit Vote'
            )}
          </button>
        </div>

        <p className="mt-4 text-sm text-midnight-400">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          Your vote is encrypted and anonymous. Zero-knowledge proofs ensure 
          your privacy while verifying your eligibility.
        </p>
      </div>
    </div>
  );
}
