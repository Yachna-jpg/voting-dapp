# Voting DApp - Privacy-Preserving Voting on Midnight

A secure, anonymous voting system built on Midnight Network that uses zero-knowledge proofs to protect voter privacy while ensuring verifiable election results.

## Contract Address

**⚠️ IMPORTANT: Contract deployment is intentionally skipped. You must deploy the contract manually.**

| Network | Contract Address |
|---------|------------------|
| Preprod | `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` |

Or set the environment variable:

```env
CONTRACT_ADDRESS=<YOUR_DEPLOYED_CONTRACT_ADDRESS>
```

## Features

- **Complete Privacy**: Your vote is encrypted and anonymous using zero-knowledge proofs
- **Verifiable Results**: All votes are counted accurately and transparently
- **One Vote Per Person**: Cryptographic commitments prevent double-voting
- **Real-time Results**: Live vote counting with privacy preservation
- **Session Management**: Create, manage, and conclude voting sessions
- **Wallet Integration**: Seamless Lace wallet connection

## What This Project Does

This Voting DApp allows organizations to conduct secure, privacy-preserving elections where:

1. **Voters** can cast anonymous ballots that cannot be traced back to them
2. **Administrators** can create voting sessions with custom parameters
3. **Everyone** can verify results without compromising individual privacy
4. **Eligibility** is proven without revealing voter identity

The system uses Midnight's Compact smart contracts to ensure:
- Only registered voters can participate
- Each voter can only vote once
- Vote choices remain completely private
- Final tallies are accurate and verifiable

## Privacy Model

### Public Information
- Total number of registered voters
- Number of candidates/options
- Voting session start and end times
- Aggregate vote counts (final results)
- Total votes cast
- Which voters have participated (by commitment only)

### Private Information
- **Individual vote choices** - Never revealed
- **Voter identity** - Protected by zero-knowledge proofs
- **Voter credentials** - Encrypted and private
- **Ballot details** - Confidential until tally

### What Users Prove Without Revealing
- ✅ They are registered to vote (without revealing who they are)
- ✅ They haven't voted before (without revealing identity)
- ✅ They voted for a valid candidate (without revealing which one)
- ✅ They voted exactly once (without linking to their identity)

## Tech Stack

### Smart Contract
- **Compact** - Midnight's privacy-preserving smart contract language
- **Zero-Knowledge Proofs** - ZK-SNARKs for privacy verification

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Vite** - Build tool

### Backend/API
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety

### Wallet
- **Lace** - Midnight-compatible wallet
- **1AM** - Alternative wallet option

### Infrastructure
- **Docker** - Proof server containerization
- **Midnight Network** - Privacy-preserving blockchain

## Folder Structure

```
voting-dapp/
├── contract/                  # Compact smart contract
│   ├── voting.compact        # Main voting contract (privacy-preserving)
│   └── package.json          # Contract dependencies
├── src/                       # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   └── Layout.tsx    # Main layout with navigation
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useWallet.tsx # Wallet connection logic
│   │   │   └── useVotingContract.ts # Contract interaction
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Landing page
│   │   │   ├── Vote.tsx      # Voting interface
│   │   │   ├── Results.tsx   # Results dashboard
│   │   │   └── CreateSession.tsx # Session creation
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── package.json          # Frontend dependencies
│   ├── tsconfig.json         # TypeScript config
│   ├── vite.config.ts        # Vite configuration
│   └── tailwind.config.js    # Tailwind CSS config
├── api/                       # Backend API server
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   │   ├── voteController.ts
│   │   │   └── sessionController.ts
│   │   ├── routes/           # Express routes
│   │   │   ├── voting.ts
│   │   │   └── session.ts
│   │   └── index.ts          # API entry point
│   ├── package.json          # API dependencies
│   └── tsconfig.json         # TypeScript config
├── bboard-cli/                # CLI tool for deployment
│   ├── src/
│   │   ├── commands/         # CLI commands
│   │   │   ├── deploy.ts
│   │   │   └── createSession.ts
│   │   └── index.ts          # CLI entry point
│   ├── package.json          # CLI dependencies
│   └── tsconfig.json         # TypeScript config
├── package.json               # Root package.json
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## Prerequisites

Before you begin, ensure you have:

- **Node.js** v22 or higher ([Download](https://nodejs.org/))
- **Docker** Desktop ([Download](https://www.docker.com/))
- **Git** ([Download](https://git-scm.com/))
- **Lace Wallet** or **1AM Wallet** browser extension
- **Compact Compiler** (Linux/macOS only, or use WSL on Windows)

### Wallet Setup

1. Install Lace Midnight Preview wallet:
   - Chrome: [Lace Midnight Preview](https://chromewebstore.google.com/detail/lace-midnight-preview/hgeekaiplokcnmakghbdfbgnlfheichg)
   - Or 1AM: [1AM Wallet](https://chromewebstore.google.com/detail/1am/bphnkdkcnfhompoegfpgnkidcjfbojjp)

2. Fund your wallet with test tokens:
   - Visit: https://midnight-tmnight-preprod.nethermind.dev/
   - Connect your wallet
   - Request test tokens

## Installation

### 1. Clone the Repository

```bash
git clone <YOUR_REPO_URL>
cd voting-dapp
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install API Dependencies

```bash
cd api
npm install
cd ..
```

### 4. Install Frontend Dependencies

```bash
cd src
npm install
cd ..
```

### 5. Install CLI Dependencies

```bash
cd bboard-cli
npm install
cd ..
```

### 6. Install Compact Compiler (Linux/macOS only)

**For Linux/macOS:**
```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
```

**For Windows (using WSL):**
1. Install WSL: `wsl --install`
2. Restart your computer
3. Open Ubuntu in WSL
4. Run the installation command above inside WSL

### 7. Start Proof Server (Docker)

```bash
docker run -d -p 6300:6300 -e PORT=6300 midnightnetwork/proof-server:latest
```

Verify it's running:
```bash
docker ps | grep proof-server
```

## Build

Build all components:

```bash
npm run build
```

Or build individually:

```bash
# Build frontend
cd src
npm run build

# Build API
cd api
npm run build

# Build CLI
cd bboard-cli
npm run build
```

## Compile

**IMPORTANT**: Compact compilation requires Linux or macOS. Windows users must use WSL.

```bash
cd contract
compact build
```

Expected output:
```
✓ Compilation successful
✓ Zero-knowledge parameters generated
✓ Contract ready for deployment
```

### Fixing Compilation Issues

If compilation fails:

1. **Check Compact version**: `compact --version` (should be 0.31.1+)
2. **Verify contract syntax**: Check `voting.compact` for syntax errors
3. **Clear cache**: `rm -rf .compact/`
4. **Reinstall compiler**: Run the installation script again

## Manual Deployment

**Deployment is intentionally skipped** to allow you to deploy to your own wallet/network.

### Deploy the Contract

After compilation, deploy using:

```bash
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod
```

Or manually:

```bash
cd bboard-cli
npm run preprod-remote
```

The deployment will:
1. Upload the contract to Midnight network
2. Initialize the voting session
3. Return a contract address

**Save the contract address!** You'll need it in the next step.

## After Deployment

After deploying the contract, you must update the contract address in your codebase.

### 1. Update the Frontend

Open `src/src/hooks/useVotingContract.ts` and replace:

```typescript
const CONTRACT_ADDRESS = '<YOUR_DEPLOYED_CONTRACT_ADDRESS>';
```

With your actual address:

```typescript
const CONTRACT_ADDRESS = '0x1234567890abcdef...';
```

### 2. Create Environment File

Create `.env` in the root directory:

```env
CONTRACT_ADDRESS=0x1234567890abcdef...
VITE_API_URL=http://localhost:4000/api
```

### 3. Update API Configuration

If needed, update `api/src/controllers/sessionController.ts` with the contract address.

### 4. Rebuild

```bash
npm run build
```

## Running Locally

### Development Mode

Run all services in development:

```bash
npm run dev
```

This starts:
- Frontend on http://localhost:3000
- API on http://localhost:4000

### Individual Services

```bash
# Frontend only
cd src
npm run dev

# API only
cd api
npm run dev
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `CONTRACT_ADDRESS` | Deployed contract address | - | ✅ Yes |
| `VITE_API_URL` | API endpoint URL | `http://localhost:4000/api` | ✅ Yes |
| `PORT` | API server port | `4000` | ❌ No |
| `NETWORK` | Midnight network | `preprod` | ❌ No |

## Testing

```bash
npm test
```

Or test individually:

```bash
# Contract tests
cd contract
npm test

# API tests
cd api
npm test

# Frontend tests
cd src
npm test
```

## Screenshots

_Add screenshots here after deployment:_

- [ ] Home page
- [ ] Voting interface
- [ ] Results dashboard
- [ ] Create session form
- [ ] Wallet connection

## Initial Idea

_This project was built for the Midnight Builder Challenge - Rise In Level 1._

**Project Category**: Privacy-Preserving Voting

**Use Cases**:
- Organizational elections
- Community governance votes
- Anonymous surveys
- Decentralized decision-making
- Confidential polling

## Troubleshooting

### Common Issues

#### 1. "Compact compiler not found"
**Solution**: Install Compact compiler or use WSL on Windows.
```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
```

#### 2. "Wallet not connected"
**Solution**: 
- Install Lace wallet extension
- Refresh the page
- Click "Connect Wallet" button
- Approve the connection in your wallet

#### 3. "Proof server not running"
**Solution**: 
```bash
docker run -d -p 6300:6300 -e PORT=6300 midnightnetwork/proof-server:8.1.0
```

#### 4. "Contract address not set"
**Solution**: 
- Deploy the contract first
- Update `CONTRACT_ADDRESS` in all configuration files
- Rebuild the project

#### 5. "Node version mismatch"
**Solution**: 
```bash
# Check version
node --version

# Install correct version (v22+)
# Download from https://nodejs.org/
```

#### 6. "Docker not running"
**Solution**: 
- Start Docker Desktop
- Verify: `docker ps`
- Grant necessary permissions

#### 7. "Cannot connect to API"
**Solution**: 
- Start the API server: `cd api && npm run dev`
- Check PORT environment variable
- Verify CORS settings

### Getting Help

- **Midnight Docs**: https://docs.midnight.network/
- **Discord**: Midnight Network Discord server
- **GitHub Issues**: Report bugs in this repository

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ on Midnight Network**

*Privacy-preserving voting for a better future*
