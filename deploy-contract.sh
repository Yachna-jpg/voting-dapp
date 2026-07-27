#!/bin/bash

echo "========================================"
echo "Voting DApp - Contract Deployment"
echo "========================================"
echo ""

# Navigate to contract folder
echo "Navigating to contract folder..."
cd /mnt/c/Users/Yachna\\ Gupta/Harshal-World/voting-dapp/contract

# Compile contract
echo ""
echo "Compiling contract..."
echo "This may take 2-5 minutes..."
compact build

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Contract compilation failed!"
    echo "Please check for errors above"
    exit 1
fi

echo ""
echo "SUCCESS: Contract compiled!"
echo ""

# Navigate to CLI
echo "Navigating to CLI folder..."
cd /mnt/c/Users/Yachna\\ Gupta/Harshal-World/voting-dapp/bboard-cli

# Deploy
echo ""
echo "Deploying contract to preprod network..."
echo "This may take 3-5 minutes..."
npm run preprod-remote

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Deployment failed!"
    echo "Please check for errors above"
    exit 1
fi

echo ""
echo "========================================"
echo "DEPLOYMENT COMPLETE!"
echo "========================================"
echo ""
echo "IMPORTANT: Copy the contract address shown above!"
echo "You'll need it to update the configuration files"
echo ""
echo "Next steps:"
echo "  1. Copy the contract address"
echo "  2. Update src/src/hooks/useVotingContract.ts"
echo "  3. Replace <YOUR_DEPLOYED_CONTRACT_ADDRESS> with your address"
echo "  4. Create .env file in root folder"
echo ""
