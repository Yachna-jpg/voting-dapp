import { Link, Outlet, useLocation } from 'react-router-dom';
import { Vote, BarChart3, PlusCircle, Home } from 'lucide-react';
import { useEffect } from 'react';

export default function Layout() {
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
            <div className="flex items-center justify-between w-full">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
                  <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                    <div className="bg-glow-purple rounded-[3px]"></div>
                    <div className="bg-pink-500 rounded-[3px]"></div>
                    <div className="bg-yellow-500 rounded-[3px]"></div>
                    <div className="bg-blue-600 rounded-[3px]"></div>
                  </div>
                </div>
                <h1 className="text-xl font-display font-bold tracking-tight text-white group-hover:text-glow-cyan transition-colors">
                  VotingDApp
                </h1>
              </Link>
              
              <nav className="hidden lg:flex items-center space-x-6">
                <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Home" current={location.pathname === '/'} />
                <NavLink to="/vote" icon={<Vote className="w-4 h-4" />} text="Vote" current={location.pathname === '/vote'} />
                <NavLink to="/results" icon={<BarChart3 className="w-4 h-4" />} text="Results" current={location.pathname === '/results'} />
                <NavLink to="/create" icon={<PlusCircle className="w-4 h-4" />} text="Create" current={location.pathname === '/create'} />
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16 animate-fade-in-up">
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
      className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
        current 
          ? 'text-white' 
          : 'text-midnight-300 hover:text-white'
      }`}
    >
      <span className="opacity-70">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}
