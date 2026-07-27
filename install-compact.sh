#!/bin/bash

echo "========================================"
echo "Compact Compiler Installation Script"
echo "========================================"
echo ""

# Update system
echo "STEP 1: Updating system packages..."
sudo apt update -y
sudo apt upgrade -y
echo ""

# Install curl
echo "STEP 2: Installing curl..."
sudo apt install curl -y
echo ""

# Install Compact compiler
echo "STEP 3: Installing Compact compiler..."
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
echo ""

# Verify installation
echo "STEP 4: Verifying installation..."
compact --version

if [ $? -eq 0 ]; then
    echo ""
    echo "SUCCESS: Compact compiler installed!"
    echo ""
    echo "Next steps:"
    echo "  1. Navigate to contract folder:"
    echo "     cd /mnt/c/Users/Yachna\\ Gupta/Harshal-World/voting-dapp/contract"
    echo "  2. Compile contract:"
    echo "     compact build"
    echo "  3. Deploy contract:"
    echo "     cd /mnt/c/Users/Yachna\\ Gupta/Harshal-World/voting-dapp/bboard-cli"
    echo "     npm run preprod-remote"
    echo ""
else
    echo ""
    echo "ERROR: Compact installation failed"
    echo "Please check your internet connection and try again"
    exit 1
fi
