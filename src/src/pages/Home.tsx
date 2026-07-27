import { Link } from 'react-router-dom';
import { Vote, Shield, Eye, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Privacy-Preserving
          <span className="text-midnight-400 block mt-2">Voting System</span>
        </h1>
        <p className="text-xl text-midnight-300 max-w-3xl mx-auto mb-8">
          Cast your vote with complete privacy and verifiability. 
          Built on Midnight Network using zero-knowledge proofs to protect your voting choices.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/vote" className="btn-primary text-lg px-8 py-3">
            Cast Your Vote
          </Link>
          <Link to="/results" className="btn-secondary text-lg px-8 py-3">
            View Results
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card">
          <Shield className="w-12 h-12 text-midnight-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Complete Privacy
          </h3>
          <p className="text-midnight-300">
            Your vote is encrypted and anonymous. Zero-knowledge proofs ensure 
            your voting choice remains private while proving eligibility.
          </p>
        </div>

        <div className="card">
          <Eye className="w-12 h-12 text-midnight-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Verifiable Results
          </h3>
          <p className="text-midnight-300">
            All votes are counted accurately and transparently. 
            Results are publicly verifiable without revealing individual votes.
          </p>
        </div>

        <div className="card">
          <Users className="w-12 h-12 text-midnight-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            One Vote Per Person
          </h3>
          <p className="text-midnight-300">
            Cryptographic commitments prevent double-voting while 
            maintaining voter anonymity throughout the process.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="card">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-midnight-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Connect Wallet</h4>
            <p className="text-midnight-300 text-sm">
              Connect your Lace wallet to verify your identity
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-midnight-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Verify Eligibility</h4>
            <p className="text-midnight-300 text-sm">
              Prove you're registered without revealing who you are
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-midnight-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Cast Vote</h4>
            <p className="text-midnight-300 text-sm">
              Submit your encrypted, anonymous ballot
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-midnight-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">View Results</h4>
            <p className="text-midnight-300 text-sm">
              See real-time results while privacy is maintained
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Participate?
        </h2>
        <p className="text-midnight-300 mb-8 max-w-2xl mx-auto">
          Join the future of secure, private voting. Get started by connecting your wallet 
          and exploring the current voting session.
        </p>
        <Link to="/vote" className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-3">
          <span>Start Voting</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
