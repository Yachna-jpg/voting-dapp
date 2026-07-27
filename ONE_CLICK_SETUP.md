# 🚀 One-Click Setup - Voting DApp

## AUTOMATED SETUP (Recommended)

### Step 1: Install WSL (Requires Restart)

**Right-click on `install-wsl.bat` → Run as Administrator**

This will:
- Enable WSL Windows feature
- Install Ubuntu distribution
- Prompt you to restart

**After restart:** Ubuntu will open automatically. Create username and password.

---

### Step 2: Install Compact Compiler (Inside Ubuntu)

**After Ubuntu installs, open Ubuntu and run:**

```bash
cd /mnt/c/Users/Yachna\ Gupta/Harshal-World/voting-dapp
chmod +x install-compact.sh
./install-compact.sh
```

This will:
- Update system packages
- Install curl
- Install Compact compiler automatically
- Verify installation

---

### Step 3: Deploy Contract (Inside Ubuntu)

**Still in Ubuntu, run:**

```bash
chmod +x deploy-contract.sh
./deploy-contract.sh
```

This will:
- Compile the voting contract
- Deploy to preprod network
- Display the contract address

**⚠️ IMPORTANT: COPY THE CONTRACT ADDRESS!**

---

### Step 4: Update Contract Address (Windows)

**In Windows (PowerShell/VS Code):**

1. Open `src/src/hooks/useVotingContract.ts`
2. Find line 5 with `0x7a3f8b9e6c4d2a1f5e8d9c0b7a6f3e4d2c1b8a9f`
3. Replace with your actual address
4. Save the file

5. Create `.env` file in root folder:
   ```env
   CONTRACT_ADDRESS=0xYourActualAddress
   VITE_API_URL=http://localhost:4000/api
   NETWORK=preprod
   ```

---

### Step 5: Start the Application

**Open TWO PowerShell/Command Prompt windows:**

**Terminal 1 (API):**
```bash
cd "C:\Users\Yachna Gupta\Harshal-World\voting-dapp\api"
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd "C:\Users\Yachna Gupta\Harshal-World\voting-dapp\src"
npm run dev
```

Then open: **http://localhost:3000**

---

## MANUAL SETUP (If automated fails)

### 1. Install WSL Manually

**PowerShell as Administrator:**
```powershell
wsl --install
```
Restart computer when prompted.

### 2. Install Compact Manually (Inside Ubuntu)

```bash
sudo apt update && sudo apt install curl -y
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
compact --version
```

### 3. Compile Contract (Inside Ubuntu)

```bash
cd /mnt/c/Users/Yachna\ Gupta/Harshal-World/voting-dapp/contract
compact build
```

### 4. Deploy Contract (Inside Ubuntu)

```bash
cd /mnt/c/Users/Yachna\ Gupta/Harshal-World/voting-dapp/bboard-cli
npm run preprod-remote
```

### 5. Update Address & Start

Follow Step 4 and Step 5 from automated setup above.

---

## TROUBLESHOOTING

### "install-wsl.bat" doesn't work
**Solution:** Run PowerShell as Administrator manually:
```powershell
wsl --install
```
Then restart.

### "compact: command not found"
**Solution:** Make sure you're in Ubuntu terminal, not PowerShell. Re-run install-compact.sh

### "npm install failed"
**Solution:** Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
**Solution:** Kill the process or use different port:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.ts
```

### "Cannot connect to wallet"
**Solution:**
- Install Lace wallet extension
- Make sure you're on preprod network
- Refresh the page

---

## VERIFICATION CHECKLIST

Before proceeding, verify:

- [ ] WSL installed (`wsl --list` shows Ubuntu)
- [ ] Compact installed (`compact --version` returns version)
- [ ] Contract compiled (no errors in `compact build`)
- [ ] Contract deployed (got contract address)
- [ ] Address updated in code
- [ ] `.env` file created
- [ ] Proof server running (`docker ps` shows proof-server)
- [ ] API running (http://localhost:4000/health works)
- [ ] Frontend running (http://localhost:3000 loads)

---

## NEXT STEPS

After everything is running:

1. **Test the application:**
   - Connect wallet
   - Create voting session
   - Cast vote
   - View results

2. **Push to GitHub:**
   ```bash
   cd "C:\Users\Yachna Gupta\Harshal-World\voting-dapp"
   git remote add origin https://github.com/YOUR_USERNAME/voting-dapp.git
   git push -u origin master
   ```

3. **Add screenshots to README.md**

4. **Submit to Rise In!**

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions.
