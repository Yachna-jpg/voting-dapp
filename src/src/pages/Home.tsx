import { Link } from 'react-router-dom';
import { Shield, Eye, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-24 pb-10">
      {/* Hero Section */}
      <section className="relative text-center pt-24 pb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-glow-purple/20 to-glow-cyan/20 blur-[100px] rounded-[100%] pointer-events-none -z-10"></div>
        
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-tight tracking-tight">
          Privacy-Preserving <br/>
          <span className="text-gradient">Voting System</span>
        </h1>
        <p className="text-lg md:text-xl text-midnight-300 max-w-2xl mx-auto mb-10 font-medium">
          Cast your vote with complete privacy and verifiability. 
          Built on Midnight Network using zero-knowledge proofs to protect your voting choices.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/vote" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center space-x-2">
            <span>Cast Your Vote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/results" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            View Results
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card group">
          <div className="w-14 h-14 rounded-2xl bg-glow-purple/20 flex items-center justify-center mb-6 border border-glow-purple/30 group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-7 h-7 text-glow-purple" />
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Complete Privacy
          </h3>
          <p className="text-midnight-300 leading-relaxed">
            Your vote is encrypted and anonymous. Zero-knowledge proofs ensure 
            your voting choice remains private while proving eligibility.
          </p>
        </div>

        <div className="card group">
          <div className="w-14 h-14 rounded-2xl bg-glow-cyan/20 flex items-center justify-center mb-6 border border-glow-cyan/30 group-hover:scale-110 transition-transform duration-300">
            <Eye className="w-7 h-7 text-glow-cyan" />
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Verifiable Results
          </h3>
          <p className="text-midnight-300 leading-relaxed">
            All votes are counted accurately and transparently. 
            Results are publicly verifiable without revealing individual votes.
          </p>
        </div>

        <div className="card group">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <Users className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            One Vote Per Person
          </h3>
          <p className="text-midnight-300 leading-relaxed">
            Cryptographic commitments prevent double-voting while 
            maintaining voter anonymity throughout the process.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="card p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-glow-purple to-glow-cyan mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-glow-purple/50 to-glow-cyan/50 -z-10"></div>
          
          {[
            { step: 1, title: 'Connect Wallet', desc: 'Connect your Lace wallet to verify your identity' },
            { step: 2, title: 'Verify Eligibility', desc: 'Prove you\'re registered without revealing who you are' },
            { step: 3, title: 'Cast Vote', desc: 'Submit your encrypted, anonymous ballot' },
            { step: 4, title: 'View Results', desc: 'See real-time results while privacy is maintained' }
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-midnight-950 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-glow-cyan/50 shadow-[0_0_15px_rgba(0,242,254,0.3)] group-hover:bg-glow-cyan group-hover:text-midnight-950 transition-all duration-300">
                <span className="text-2xl font-display font-bold text-glow-cyan group-hover:text-midnight-950">{s.step}</span>
              </div>
              <h4 className="text-xl font-display font-bold text-white mb-2">{s.title}</h4>
              <p className="text-midnight-300 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 relative overflow-hidden rounded-3xl border border-white/10 bg-midnight-900/50 backdrop-blur-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-glow-cyan/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-glow-purple/20 blur-[80px] rounded-full pointer-events-none"></div>
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
          Ready to Participate?
        </h2>
        <p className="text-lg text-midnight-300 mb-10 max-w-2xl mx-auto font-medium">
          Join the future of secure, private voting. Get started by connecting your wallet 
          and exploring the current voting session.
        </p>
        <Link to="/vote" className="inline-flex items-center space-x-2 btn-primary text-lg px-10 py-4 shadow-[0_0_30px_rgba(79,172,254,0.4)]">
          <span>Start Voting Now</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
