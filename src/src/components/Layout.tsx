import { Link, Outlet } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { Vote, BarChart3, PlusCircle, Home } from 'lucide-react';

export default function Layout() {
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-950">
      {/* Header */}
      <header className="border-b border-midnight-700/50 backdrop-blur-sm bg-midnight-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Vote className="w-8 h-8 text-midnight-400" />
                <h1 className="text-2xl font-bold text-white">Voting DApp</h1>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="flex items-center space-x-2 text-midnight-300 hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link to="/vote" className="flex items-center space-x-2 text-midnight-300 hover:text-white transition-colors">
                  <Vote className="w-4 h-4" />
                  <span>Vote</span>
                </Link>
                <Link to="/results" className="flex items-center space-x-2 text-midnight-300 hover:text-white transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>Results</span>
                </Link>
                <Link to="/create" className="flex items-center space-x-2 text-midnight-300 hover:text-white transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Session</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-midnight-300">Connected</p>
                    <p className="text-xs text-midnight-400 font-mono">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  <button onClick={disconnect} className="btn-secondary text-sm">
                    Disconnect
                  </button>
                </div>
              ) : (
                <button onClick={connect} className="btn-primary" disabled={false}>
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-midnight-700/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-midnight-400 text-sm">
            <p>Built on Midnight Network - Privacy-Preserving Voting</p>
            <p className="mt-2">
              Powered by Compact Smart Contracts & Zero-Knowledge Proofs
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
