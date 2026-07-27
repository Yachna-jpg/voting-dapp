import { useEffect } from 'react';
import { useVotingContract } from '../hooks/useVotingContract';
import { BarChart3, Trophy, AlertTriangle, Activity, Users } from 'lucide-react';

export default function Results() {
  const { session, voteCounts, fetchSessionInfo, fetchVoteCounts, isLoading } = useVotingContract();

  useEffect(() => {
    fetchSessionInfo();
    fetchVoteCounts();
  }, []);

  const maxVotes = voteCounts?.counts.reduce((max, count) => Math.max(max, count), 0) || 0;

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 card border-dashed border-2 border-white/20 bg-midnight-950/30">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-midnight-400 opacity-50" />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-4">No Session Data</h2>
        <p className="text-midnight-300 text-lg mb-8 max-w-md mx-auto">
          There is no voting session available to display results for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-cyan/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-glow-purple/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      {/* Session Overview Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-midnight-950/60 backdrop-blur-xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-24 h-24 text-glow-cyan" />
          </div>
          <h3 className="text-sm font-semibold text-midnight-300 uppercase tracking-wider mb-2 relative z-10">Session Status</h3>
          <div className="flex items-center space-x-3 relative z-10">
            <span className={`w-3 h-3 rounded-full ${session.isActive ? 'bg-glow-cyan animate-pulse shadow-[0_0_10px_rgba(0,242,254,0.8)]' : 'bg-yellow-500'}`}></span>
            <span className="text-2xl font-display font-bold text-white">
              {session.isTallied ? 'Final Results' : session.isActive ? 'Live Voting' : 'Ended (Pending)'}
            </span>
          </div>
        </div>

        <div className="card bg-midnight-950/60 backdrop-blur-xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 className="w-24 h-24 text-glow-purple" />
          </div>
          <h3 className="text-sm font-semibold text-midnight-300 uppercase tracking-wider mb-2 relative z-10">Total Votes Cast</h3>
          <p className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-glow-purple to-glow-cyan relative z-10">
            {voteCounts?.totalVotes || 0}
          </p>
        </div>

        <div className="card bg-midnight-950/60 backdrop-blur-xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-midnight-300 uppercase tracking-wider mb-2 relative z-10">Turnout</h3>
          <p className="text-4xl font-display font-bold text-white relative z-10">
            {session.totalVoters > 0
              ? (((voteCounts?.totalVotes || 0) / session.totalVoters) * 100).toFixed(1)
              : 0}%
          </p>
        </div>
      </div>

      {/* Main Results Board */}
      <div className="card bg-midnight-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
          <h2 className="text-3xl font-display font-bold text-white flex items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glow-purple/20 to-glow-cyan/20 flex items-center justify-center mr-4 border border-white/5">
              <BarChart3 className="w-6 h-6 text-glow-cyan" />
            </div>
            Live Results Board
          </h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-glow-cyan animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-glow-purple animate-spin" style={{ animationDirection: 'reverse' }}></div>
            </div>
            <p className="mt-6 text-midnight-300 font-medium tracking-wide">Syncing with Midnight Network...</p>
          </div>
        ) : voteCounts && voteCounts.counts.length > 0 ? (
          <div className="space-y-8">
            {voteCounts.counts.slice(0, session.numCandidates).map((count, index) => {
              const percentage = maxVotes > 0 ? (count / maxVotes) * 100 : 0;
              const isWinner = count === maxVotes && count > 0;

              return (
                <div key={index} className="relative group">
                  <div className="flex items-end justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`text-xl font-display font-bold ${isWinner && session.isTallied ? 'text-glow-cyan' : 'text-white'}`}>
                        Candidate {String.fromCharCode(65 + index)}
                      </span>
                      {isWinner && session.isTallied && (
                        <div className="bg-yellow-500/20 px-2 py-1 rounded-md border border-yellow-500/30 flex items-center">
                          <Trophy className="w-4 h-4 text-yellow-400 mr-1.5" />
                          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Winner</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">{count}</span>
                      <span className="text-midnight-400 text-sm ml-2 font-medium">
                        ({session.totalVoters > 0 ? ((count / session.totalVoters) * 100).toFixed(1) : 0}%)
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar Track */}
                  <div className="w-full bg-midnight-900/50 rounded-full h-5 border border-white/5 overflow-hidden relative">
                    {/* Progress Bar Fill */}
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                        isWinner && session.isTallied
                          ? 'bg-gradient-to-r from-yellow-500 to-glow-cyan shadow-[0_0_15px_rgba(0,242,254,0.5)]'
                          : 'bg-gradient-to-r from-glow-purple to-glow-cyan opacity-80'
                      }`}
                      style={{ width: `${percentage}%` }}
                    >
                      {/* Animated shimmer on progress bar */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-10 h-10 text-midnight-500" />
            </div>
            <p className="text-xl font-display text-white mb-2">No votes cast yet</p>
            <p className="text-midnight-400">Results will appear here in real-time as votes are submitted.</p>
          </div>
        )}
      </div>

      {/* End Session Warning */}
      {!session.isActive && (
        <div className="mt-8 p-6 rounded-2xl bg-[#1e1e17] border border-[#4a4015] shadow-[inset_0_0_20px_rgba(234,179,8,0.02)] flex items-start">
          <AlertTriangle className="w-6 h-6 text-amber-500 mr-4 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-bold text-amber-500/90 tracking-wide mb-1">
              Session Concluded
            </h4>
            <p className="text-midnight-300 text-sm leading-relaxed">
              This voting session has ended. The results displayed above are {session.isTallied ? 'final and tallied on the blockchain' : 'pending final cryptographic tallying by the session owner'}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
