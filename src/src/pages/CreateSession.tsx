import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useVotingContract } from '../hooks/useVotingContract';
import { Loader2, AlertTriangle, Hourglass, Users, Calculator, Lock, Minus, Plus, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateSession() {
  const { isConnected, connect } = useWallet();
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
      toast.success('Voting session created successfully!');
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

  const updateNumber = (field: keyof typeof formData, increment: number, min: number, max: number) => {
    setFormData(prev => {
      const current = prev[field] as number;
      const next = current + increment;
      if (next >= min && next <= max) {
        return { ...prev, [field]: next };
      }
      return prev;
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pt-4 relative">
      {/* Background soft lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-cyan/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-glow-purple/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      {/* Connect Wallet Button above card */}
      {!isConnected && (
        <div className="flex justify-center mb-6">
          <button 
            onClick={connect}
            className="w-full max-w-md py-3 px-6 rounded-xl border border-glow-cyan/30 bg-midnight-900/50 backdrop-blur-md text-glow-cyan font-semibold transition-all hover:bg-glow-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)]"
          >
            Connect Wallet
          </button>
        </div>
      )}

      {/* Main Glassmorphism Card */}
      <div className="card p-0 bg-midnight-950/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl rounded-2xl overflow-hidden">
        
        {/* Card Header */}
        <div className="px-8 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-display font-bold text-white tracking-wide">
            Create Voting Session
          </h2>
          {/* Step indicators */}
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          
          {/* Step 1: Core Configuration */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-semibold text-white flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-glow-cyan mr-3 shadow-[0_0_8px_rgba(0,242,254,0.6)]"></span>
              Step 1: Core Configuration
            </h3>
            
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 pl-5">
              
              {/* Session Name */}
              <div>
                <label className="block text-sm font-medium text-midnight-300 mb-2">
                  Session Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.sessionId}
                  onChange={(e) => setFormData({ ...formData, sessionId: e.target.value })}
                  placeholder="e.g., presidential-election-20"
                  className="w-full px-4 py-2.5 bg-midnight-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-glow-cyan focus:ring-1 focus:ring-glow-cyan text-white text-sm"
                />
              </div>

              {/* Maximum Voters */}
              <div>
                <label className="block text-sm font-medium text-midnight-300 mb-2">
                  Maximum Voters
                </label>
                <div className="flex items-center bg-midnight-900/50 border border-white/10 rounded-xl overflow-hidden">
                  <button 
                    type="button" 
                    onClick={() => updateNumber('totalVoters', -10, 10, 10000)}
                    className="p-3 text-midnight-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={formData.totalVoters}
                    onChange={(e) => setFormData({ ...formData, totalVoters: parseInt(e.target.value) || 0 })}
                    className="flex-1 bg-transparent text-center text-white text-sm focus:outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => updateNumber('totalVoters', 10, 10, 10000)}
                    className="p-3 text-midnight-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-midnight-400 mt-1.5">Set the maximum eligible voters</p>
              </div>

              {/* Candidates */}
              <div>
                <label className="block text-sm font-medium text-midnight-300 mb-2">
                  Candidates / Options
                </label>
                <div className="flex items-center bg-midnight-900/50 border border-white/10 rounded-xl overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => updateNumber('numCandidates', -1, 2, 10)}
                    className="p-3 text-midnight-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={formData.numCandidates}
                    onChange={(e) => setFormData({ ...formData, numCandidates: parseInt(e.target.value) || 0 })}
                    className="flex-1 bg-transparent text-center text-white text-sm focus:outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => updateNumber('numCandidates', 1, 2, 10)}
                    className="p-3 text-midnight-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-midnight-400 mt-1.5">Minimum 2, Maximum 10 candidates</p>
              </div>

              {/* Voting Duration */}
              <div>
                <label className="block text-sm font-medium text-midnight-300 mb-2">
                  Voting Duration (Hours)
                </label>
                <div className="flex items-center bg-midnight-900/50 border border-white/10 rounded-xl overflow-hidden pr-3">
                  <input
                    type="number"
                    value={formData.durationHours}
                    onChange={(e) => setFormData({ ...formData, durationHours: parseInt(e.target.value) || 0 })}
                    className="flex-1 px-4 py-2.5 bg-transparent text-white text-sm focus:outline-none"
                  />
                  <span className="text-sm text-midnight-400 font-medium">unit</span>
                </div>
                <p className="text-xs text-midnight-400 mt-1.5">How long the voting session will remain active</p>
              </div>

            </div>
          </div>

          {/* Step 2: Important Notices */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-midnight-300 flex items-center">
              <span className="w-2.5 h-2.5 rounded-full border border-midnight-500 mr-3"></span>
              Step 2: Important Notices
            </h3>
            
            <div className="pl-5">
              <div className="bg-[#1e1e17] border border-[#4a4015] rounded-xl p-5 shadow-[inset_0_0_20px_rgba(234,179,8,0.02)]">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                  <h4 className="font-bold text-amber-500/90 tracking-wide">Important Notes</h4>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start text-sm text-midnight-300">
                    <Hourglass className="w-4 h-4 text-midnight-400 mr-3 mt-0.5 shrink-0" />
                    <span><strong className="text-white font-medium">End/Tally Session:</strong> Only the owner can end or tally results.</span>
                  </li>
                  <li className="flex items-start text-sm text-midnight-300">
                    <Users className="w-4 h-4 text-midnight-400 mr-3 mt-0.5 shrink-0" />
                    <span><strong className="text-white font-medium">Voter Registration:</strong> All voters must be in the eligibility list.</span>
                  </li>
                  <li className="flex items-start text-sm text-midnight-300">
                    <Calculator className="w-4 h-4 text-midnight-400 mr-3 mt-0.5 shrink-0" />
                    <span><strong className="text-white font-medium">Single Tally:</strong> Results can only be tallied once after the session ends.</span>
                  </li>
                  <li className="flex items-start text-sm text-midnight-300">
                    <Lock className="w-4 h-4 text-midnight-400 mr-3 mt-0.5 shrink-0" />
                    <span><strong className="text-white font-medium">Privacy:</strong> All votes are private and cannot be revealed.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Footer */}
          <div className="pt-6 border-t border-white/5 text-center">
            <button
              type="submit"
              disabled={!isConnected || isLoading}
              className={`w-full max-w-2xl mx-auto py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-300 flex items-center justify-center ${
                !isConnected 
                  ? 'bg-white/5 border border-white/10 text-midnight-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Session...
                </>
              ) : (
                <>
                  Create Voting Session
                  {!isConnected && <Info className="w-4 h-4 ml-2 opacity-50" />}
                </>
              )}
            </button>
            
            {!isConnected && (
              <p className="text-sm text-midnight-400 mt-3 font-medium">
                You must connect your wallet to create a new voting session.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
