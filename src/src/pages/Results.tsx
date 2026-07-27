import { useEffect } from 'react';
import { useVotingContract } from '../hooks/useVotingContract';
import { BarChart3, Loader2, Trophy, AlertCircle } from 'lucide-react';

export default function Results() {
  const { session, voteCounts, fetchSessionInfo, fetchVoteCounts, isLoading } = useVotingContract();

  useEffect(() => {
    fetchSessionInfo();
    fetchVoteCounts();
  }, []);

  const maxVotes = voteCounts?.counts.reduce((max, count) => Math.max(max, count), 0) || 0;

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <AlertCircle className="w-16 h-16 text-midnight-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">No Session Found</h2>
        <p className="text-midnight-300">
          There is no voting session to display results for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Session Status */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-midnight-400" />
            Voting Results
          </h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              session.isTallied
                ? 'bg-green-500/20 text-green-400'
                : session.isActive
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}
          >
            {session.isTallied ? 'Final Results' : session.isActive ? 'In Progress' : 'Ended'}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-midnight-300">Total Votes Cast</p>
            <p className="text-3xl font-bold text-white">{voteCounts?.totalVotes || 0}</p>
          </div>
          <div>
            <p className="text-sm text-midnight-300">Participation Rate</p>
            <p className="text-3xl font-bold text-white">
              {session.totalVoters > 0
                ? (((voteCounts?.totalVotes || 0) / session.totalVoters) * 100).toFixed(1)
                : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Results Chart */}
      <div className="card">
        <h3 className="text-xl font-bold text-white mb-6">Candidate Results</h3>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-midnight-400" />
          </div>
        ) : voteCounts && voteCounts.counts.length > 0 ? (
          <div className="space-y-4">
            {voteCounts.counts.slice(0, session.numCandidates).map((count, index) => {
              const percentage = maxVotes > 0 ? (count / maxVotes) * 100 : 0;
              const isWinner = count === maxVotes && count > 0;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-semibold">
                        Candidate {String.fromCharCode(65 + index)}
                      </span>
                      {isWinner && session.isTallied && (
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold">{count}</span>
                      <span className="text-midnight-400 text-sm ml-2">
                        ({session.totalVoters > 0 ? ((count / session.totalVoters) * 100).toFixed(1) : 0}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-midnight-700 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        isWinner && session.isTallied
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          : 'bg-gradient-to-r from-midnight-500 to-midnight-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-midnight-400">
            <p>No votes have been cast yet</p>
          </div>
        )}
      </div>

      {/* Session Info */}
      {!session.isActive && (
        <div className="card mt-8 bg-yellow-500/10 border-yellow-500/30">
          <h4 className="text-lg font-semibold text-yellow-400 mb-2">
            Session Ended
          </h4>
          <p className="text-midnight-300">
            This voting session has ended. Results are {session.isTallied ? 'final' : 'pending finalization'}.
          </p>
        </div>
      )}
    </div>
  );
}
