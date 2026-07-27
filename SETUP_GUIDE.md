# 🚀 COMPLETE SETUP GUIDE - Voting DApp

Follow these steps IN ORDER to get your Voting DApp running.

---

## ✅ STEP 1: Install WSL (Windows Subsystem for Linux)

**Why?** The Compact compiler only works on Linux. You need WSL to run it on Windows.

### Instructions:

1. **Open PowerShell as Administrator**
   - Press `Windows + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Run this command:**
   ```powershell
   wsl --install
   ```

3. **Restart your computer** when prompted

4. **After restart**, Ubuntu will open automatically
   - Create a username (e.g., `yachna`)
   - Create a password (you won't see characters while typing - this is normal)
   - Wait for installation to complete

5. **Verify WSL is working:**
   ```bash
   wsl --list --verbose
   ```
   You should see Ubuntu listed.

---

## ✅ STEP 2: Install Compact Compiler (Inside WSL)

**Important:** You MUST do this step INSIDE the Ubuntu terminal (WSL), not in PowerShell!

1. **Open Ubuntu** (search "Ubuntu" in Windows search)

2. **Update package list:**
   ```bash
   sudo apt update
   ```

3. **Install curl (if not installed):**
   ```bash
   sudo apt install curl -y
   ```

4. **Install Compact compiler:**
   ```bash
   curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
   ```

5. **Verify installation:**
   ```bash
   compact --version
   ```
   You should see a version number (e.g., `compact 0.5.1`).

---

## ✅ STEP 3: Install Lace Wallet

1. **Open Chrome or Edge browser**

2. **Go to:** https://chromewebstore.google.com/detail/lace-midnight-preview/hgeekaiplokcnmakghbdfbgnlfheichg

3. **Click "Add to Chrome"**

4. **Set up your wallet:**
   - Click "Create New Wallet"
   - **WRITE DOWN YOUR SEED PHRASE** (12-24 words) - store it securely!
   - Create a strong password
   - Complete the setup

---

## ✅ STEP 4: Get Test Tokens

1. **Open your Lace wallet** (click the extension icon)

2. **Visit the faucet:** https://midnight-tmnight-preprod.nethermind.dev/

3. **Connect your wallet:**
   - Click "Connect Wallet"
   - Approve the connection in Lace

4. **Request test tokens:**
   - Click "Request Tokens" or "Get Test Tokens"
   - Wait for confirmation

---

## ✅ STEP 5: Start Proof Server

**Open PowerShell or Command Prompt** (NOT WSL):

```bash
docker run -d -p 6300:6300 -e PORT=6300 midnightnetwork/proof-server:8.1.0
```

**Verify it's running:**
```bash
docker ps
```

You should see `proof-server` in the list.

---

## ✅ STEP 6: Install Project Dependencies

**In PowerShell/Command Prompt** (NOT WSL):

```bash
# Navigate to project
cd "C:\Users\Yachna Gupta\Harshal-World\voting-dapp"

# Install root dependencies
npm install

# Install API dependencies
cd api
npm install
cd ..

# Install frontend dependencies (this may take 2-3 minutes)
cd src
npm install
cd ..

# Install CLI dependencies
cd bboard-cli
npm install
cd ..
```

---

## ✅ STEP 7: Compile the Contract (Inside WSL)

**This step MUST be done inside WSL/Ubuntu!**

1. **Open Ubuntu terminal**

2. **Navigate to the contract folder:**
   ```bash
   cd /mnt/c/Users/Yachna\ Gupta/Harshal-World/voting-dapp/contract
   ```

3. **Compile the contract:**
   ```bash
   compact build
   ```

4. **Wait for compilation** (may take 1-2 minutes)

5. **You should see:**
   ```
   ✓ Compilation successful
   ✓ Zero-knowledge parameters generated
   ```

---

## ✅ STEP 8: Deploy the Contract (Inside WSL)

**Still inside WSL/Ubuntu:**

1. **Navigate to CLI folder:**
   ```bash
   cd /mnt/c/Users/Yachna\ Gupta/Harshal-World/voting-dapp/bboard-cli
   ```

2. **Deploy to preprod network:**
   ```bash
   npm run preprod-remote
   ```

3. **Wait for deployment** (may take 2-5 minutes)

4. **SAVE THE CONTRACT ADDRESS!** It will look like:
   ```
   Contract Address: 0x1234567890abcdef1234567890abcdef12345678
   ```

---

## ✅ STEP 9: Update Contract Address

**Back in PowerShell/Windows:**

1. **Update `src/src/hooks/useVotingContract.ts`:**
   - Open the file
   - Find line 5: `const CONTRACT_ADDRESS = '<YOUR_DEPLOYED_CONTRACT_ADDRESS>';`
   - Replace with your actual address:
     ```typescript
     const CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
     ```

2. **Create `.env` file in root folder:**
   ```bash
   cd "C:\Users\Yachna Gupta\Harshal-World\voting-dapp"
   notepad .env
   ```
   
   Add this content:
   ```env
   CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678
   VITE_API_URL=http://localhost:4000/api
   NETWORK=preprod
   ```

3. **Save and close**

---

## ✅ STEP 10: Start the Application

**You need TWO terminal windows:**

### Terminal 1 - API Server:
```bash
cd "C:\Users\Yachna Gupta\Harshal-World\voting-dapp\api"
npm run dev
```

You should see: `🚀 Voting DApp API running on port 4000`

### Terminal 2 - Frontend:
```bash
cd "C:\Users\Yachna Gupta\Harshal-World\voting-dapp\src"
npm run dev
```

You should see: `Local: http://localhost:3000`

---

## ✅ STEP 11: Test the Application

1. **Open browser:** http://localhost:3000

2. **Connect wallet:**
   - Click "Connect Wallet" button (top right)
   - Approve in Lace wallet

3. **Create a voting session:**
   - Click "Create Session" in navigation
   - Fill in the form
   - Click "Create Voting Session"

4. **Cast a vote:**
   - Click "Vote" in navigation
   - Select a candidate
   - Click "Submit Vote"

5. **View results:**
   - Click "Results" in navigation
   - See the vote counts

---

## 🎯 TROUBLESHOOTING

### Problem: "wsl: command not found"
**Solution:** Enable WSL feature:
1. Open PowerShell as Admin
2. Run: `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
3. Restart computer

### Problem: "compact: command not found"
**Solution:** 
- Make sure you're in Ubuntu terminal (WSL), not PowerShell
- Re-run the installation command

### Problem: "Docker is not running"
**Solution:**
- Open Docker Desktop
- Wait for it to start (whale icon in system tray)
- Try the docker run command again

### Problem: "npm install takes forever"
**Solution:**
- Be patient (can take 3-5 minutes)
- Check your internet connection
- Try: `npm install --verbose` to see progress

### Problem: "Cannot connect to wallet"
**Solution:**
- Refresh the page
- Make sure Lace extension is installed
- Make sure you're on the preprod network in Lace

### Problem: "Contract compilation fails"
**Solution:**
- Make sure you're using WSL (Ubuntu), not PowerShell
- Check Compact version: `compact --version` (should be 0.31.1+)
- Try reinstalling Compact

---

## 📋 FINAL CHECKLIST

Before submitting to Rise In:

- [ ] WSL installed and working
- [ ] Compact compiler installed (in WSL)
- [ ] Lace wallet installed and funded
- [ ] Proof server running (Docker)
- [ ] All dependencies installed
- [ ] Contract compiled successfully
- [ ] Contract deployed (got address)
- [ ] Contract address updated in code
- [ ] Application runs locally
- [ ] Can connect wallet
- [ ] Can create voting session
- [ ] Can cast vote
- [ ] Can view results
- [ ] Git repository pushed to GitHub
- [ ] README.md updated with contract address
- [ ] Screenshots added to README

---

## 🆘 Need More Help?

- **Midnight Docs:** https://docs.midnight.network/
- **Discord:** Midnight Network Discord
- **GitHub Issues:** Create an issue in this repo

---

**Good luck with the Midnight Builder Challenge! 🚀**
