import { Link, Outlet, useLocation } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { Vote, BarChart3, PlusCircle, Home } from 'lucide-react';
import { useEffect } from 'react';

export default function Layout() {
  const { isConnected, address, connect, disconnect } = useWallet();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-midnight-950 overflow-hidden font-sans text-white">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-glow-purple/20 blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-glow-cyan/20 blur-[150px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-midnight-600/30 blur-[130px] animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight-950/50 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-10">
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-glow-purple to-glow-cyan p-0.5 shadow-[0_0_15px_rgba(79,172,254,0.5)] transition-transform group-hover:scale-105">
                    <div className="w-full h-full bg-midnight-950 rounded-[10px] flex items-center justify-center">
                      <Vote className="w-5 h-5 text-glow-cyan" />
                    </div>
                  </div>
                  <h1 className="text-2xl font-display font-bold tracking-tight text-white group-hover:text-glow-cyan transition-colors">
                    Voting<span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-purple to-glow-cyan">DApp</span>
                  </h1>
                </Link>
                
                <nav className="hidden lg:flex items-center space-x-1 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                  <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Home" current={location.pathname === '/'} />
                  <NavLink to="/vote" icon={<Vote className="w-4 h-4" />} text="Vote" current={location.pathname === '/vote'} />
                  <NavLink to="/results" icon={<BarChart3 className="w-4 h-4" />} text="Results" current={location.pathname === '/results'} />
                  <NavLink to="/create" icon={<PlusCircle className="w-4 h-4" />} text="Create" current={location.pathname === '/create'} />
                </nav>
              </div>

              <div className="flex items-center">
                {isConnected ? (
                  <div className="flex items-center space-x-4 bg-white/5 pl-4 pr-1 py-1 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider text-glow-cyan font-bold">Connected</p>
                      <p className="text-sm text-white font-mono font-medium">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </p>
                    </div>
                    <button onClick={disconnect} className="btn-secondary py-2 px-4 text-sm !rounded-xl">
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button onClick={connect} className="btn-primary py-2.5 px-6 rounded-2xl text-sm shadow-[0_0_20px_rgba(79,172,254,0.3)]">
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-12 animate-fade-in-up">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-midnight-950/80 backdrop-blur-xl mt-auto">
          <div className="container mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Vote className="w-6 h-6 text-glow-purple" />
                <span className="font-display font-bold text-xl text-white">VotingDApp</span>
              </div>
              <div className="text-center md:text-right text-midnight-300 text-sm">
                <p>Built on <span className="text-white font-semibold">Midnight Network</span></p>
                <p className="mt-1 opacity-70">Powered by Compact Smart Contracts & Zero-Knowledge Proofs</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NavLink({ to, icon, text, current }: { to: string, icon: React.ReactNode, text: string, current: boolean }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
        current 
          ? 'bg-gradient-to-r from-glow-purple/20 to-glow-cyan/20 text-white shadow-[inset_0_0_20px_rgba(0,242,254,0.1)] border border-white/10' 
          : 'text-midnight-300 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
