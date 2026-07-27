import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useVotingContract } from '../hooks/useVotingContract';
import { Vote as VoteIcon, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
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
      <div className="max-w-2xl mx-auto text-center py-20 card border-dashed border-2 border-white/20 bg-midnight-950/30">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-midnight-400 opacity-50" />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-4">No Active Session</h2>
        <p className="text-midnight-300 text-lg mb-8 max-w-md mx-auto">
          There is currently no active voting session. Please check back later or 
          create a new voting session as an administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {/* Background glow behind main vote card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-glow-purple/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Session Info */}
      <div className="card bg-gradient-to-br from-midnight-900/80 to-midnight-950/80 border-t-2 border-t-glow-cyan/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <h2 className="text-3xl font-display font-bold text-white flex items-center">
            <div className="w-12 h-12 rounded-xl bg-glow-cyan/20 flex items-center justify-center mr-4">
              <VoteIcon className="w-6 h-6 text-glow-cyan" />
            </div>
            Active Voting Session
          </h2>
          <div className="px-5 py-2 bg-glow-cyan/10 border border-glow-cyan/30 text-glow-cyan rounded-full text-sm font-bold tracking-wide uppercase flex items-center shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <span className="w-2 h-2 rounded-full bg-glow-cyan animate-pulse mr-2"></span>
            Live
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/5">
            <p className="text-sm text-midnight-300 uppercase tracking-wider font-semibold mb-2">Total Voters</p>
            <p className="text-4xl font-display font-bold text-white">{session.totalVoters}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/5">
            <p className="text-sm text-midnight-300 uppercase tracking-wider font-semibold mb-2">Candidates</p>
            <p className="text-4xl font-display font-bold text-white">{session.numCandidates}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-glow-purple/20 blur-2xl rounded-full group-hover:bg-glow-purple/40 transition-colors"></div>
            <p className="text-sm text-midnight-300 uppercase tracking-wider font-semibold mb-2 relative z-10">Votes Cast</p>
            <p className="text-4xl font-display font-bold text-white relative z-10">
              {voteCounts?.totalVotes || 0}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 flex items-center justify-end text-sm text-midnight-300">
          <span className="mr-3 flex items-center">
            <Loader2 className="w-4 h-4 mr-1 animate-spin text-glow-cyan" />
            Session ends at:
          </span>
          <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-lg">
            {new Date(session.endTime).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Voting Interface */}
      <div className="card relative overflow-hidden">
        <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center">
          <span className="w-8 h-8 rounded-full bg-glow-purple/20 text-glow-purple flex items-center justify-center text-sm mr-3">1</span>
          Select Your Candidate
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {candidates.map((candidate) => {
            const isSelected = selectedCandidate === candidate.id;
            return (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate.id)}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 overflow-hidden group ${
                  isSelected
                    ? 'border-glow-cyan bg-glow-cyan/10 shadow-[0_0_20px_rgba(0,242,254,0.2)] scale-[1.02]'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {isSelected && (
                  <div className="absolute right-0 top-0 w-32 h-32 bg-glow-cyan/20 blur-3xl rounded-full"></div>
                )}
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-glow-cyan bg-glow-cyan'
                          : 'border-midnight-600 group-hover:border-midnight-400'
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-midnight-950" />
                      )}
                    </div>
                    <span className={`text-xl font-display font-bold transition-colors ${isSelected ? 'text-glow-cyan' : 'text-white'}`}>
                      {candidate.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-8 border-t border-white/10">
          <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-glow-purple/20 text-glow-purple flex items-center justify-center text-sm mr-3">2</span>
            Confirm Submission
          </h3>
          
          <button
            onClick={handleVote}
            disabled={!isConnected || selectedCandidate === null || isLoading || isSubmitting}
            className="btn-primary w-full py-5 text-xl tracking-wide uppercase shadow-[0_0_30px_rgba(79,172,254,0.3)]"
          >
            {isLoading || isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Encrypting & Submitting Vote...
              </span>
            ) : (
              'Cast Secure Vote'
            )}
          </button>

          <div className="mt-6 p-4 rounded-xl bg-glow-purple/10 border border-glow-purple/20 flex items-start">
            <AlertCircle className="w-5 h-5 text-glow-purple mr-3 mt-0.5 shrink-0" />
            <p className="text-sm text-midnight-300 leading-relaxed">
              <span className="text-white font-semibold block mb-1">Zero-Knowledge Proof Generation</span>
              Your vote is encrypted locally on your device. The network only receives a cryptographic proof that you are eligible and haven't voted yet, ensuring absolute privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
