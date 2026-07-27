# Quick Start Guide - Voting DApp

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
cd voting-dapp
npm install
cd api && npm install && cd ..
cd src && npm install && cd ..
cd bboard-cli && npm install && cd ..
```

### Step 2: Start Proof Server

```bash
docker run -d -p 6300:6300 -e PORT=6300 midnightnetwork/proof-server:latest
```

### Step 3: Start Development Servers

```bash
# Terminal 1 - API
cd api
npm run dev

# Terminal 2 - Frontend
cd src
npm run dev
```

### Step 4: Connect Wallet

1. Open http://localhost:3000
2. Install Lace Midnight wallet (if not installed)
3. Click "Connect Wallet"
4. Get test tokens from faucet

### Step 5: Deploy Contract (Requires Linux/macOS/WSL)

```bash
# Install Compact compiler first (Linux/macOS only)
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

# Deploy
cd bboard-cli
npm run preprod-remote
```

### Step 6: Update Contract Address

After deployment, update:
- `src/src/hooks/useVotingContract.ts` - Replace `0x7a3f8b9e6c4d2a1f5e8d9c0b7a6f3e4d2c1b8a9f`
- `.env` - Add `CONTRACT_ADDRESS=0x...`

### Step 7: Create Voting Session

1. Go to http://localhost:3000/create
2. Fill in session details
3. Click "Create Voting Session"
4. Share the link with voters!

---

## 📝 Checklist

- [ ] Dependencies installed
- [ ] Docker proof server running
- [ ] API server running (port 4000)
- [ ] Frontend running (port 3000)
- [ ] Wallet connected
- [ ] Contract deployed
- [ ] Contract address updated
- [ ] Voting session created

## 🆘 Need Help?

- **Compact compiler issues**: Use WSL on Windows or Linux/macOS
- **Wallet issues**: Reinstall Lace extension and refresh
- **Docker issues**: Restart Docker Desktop
- **API issues**: Check port 4000 is available

## 📚 Next Steps

1. Read the full README.md for detailed documentation
2. Customize the voting contract for your needs
3. Add more features to the frontend
4. Test thoroughly before production use

---

**Built on Midnight Network** 🌙
