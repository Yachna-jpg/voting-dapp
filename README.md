# Voting DApp

A privacy-preserving voting dApp built on the Midnight Network to ensure secure, anonymous elections.

## Contract Address

| Network | Contract Address |
|---------|------------------|
| Preprod | `0x7a3f8b9e6c4d2a1f5e8d9c0b7a6f3e4d2c1b8a9f` |

## Features

- **Anonymous Voting**: Voters can cast ballots without revealing their identity or vote choices to the public.
- **Zero-Knowledge Proofs**: Eligibility is proven locally without transmitting sensitive private data.
- **Transparent Tallying**: The total votes are counted publicly, ensuring verifiable election outcomes.
- **Secure Sessions**: Only authorized administrators can initialize and conclude voting sessions.

## What This Project Does

The Voting DApp is a decentralized application that runs on the Midnight blockchain. It allows users to participate in elections or polls with complete privacy. Unlike traditional public blockchains where every transaction (and thus every vote) is visible, this dApp uses zero-knowledge cryptography to mask who voted for whom while still proving that all votes were cast by eligible participants and accurately counted.

## Privacy Model

- **Public Information**: 
  - Total number of votes cast.
  - Vote counts for each candidate.
  - The voting session's active status.
- **Private Information**:
  - The voter's secret credentials.
  - Who an individual voter voted for.
- **What users prove without revealing**:
  - Voters prove they are eligible to vote.
  - Voters prove they have not already voted in the current session.

## Tech Stack

- **Smart Contract**: Midnight Compact (v0.5.1)
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend / API**: Node.js, Express, TypeScript
- **CLI Tooling**: Commander, TypeScript
- **Wallet**: Lace Midnight extension

## Folder Structure

- `api/` - Express backend providing REST endpoints.
- `contract/` - Midnight Compact smart contract (`voting.compact`).
- `src/` - React frontend application.
- `voting-cli/` - CLI tooling for deployment and management.

## Prerequisites

- **Node.js** v22.x or higher
- **Docker** (for running the local proof server)
- **Compact Compiler** (for smart contract compilation)
- **Lace Midnight Wallet** browser extension

## Installation

```bash
# Install root dependencies
npm install

# Install API dependencies
cd api
npm install
cd ..

# Install contract dependencies
cd contract
npm install
cd ..

# Install CLI dependencies
cd voting-cli
npm install
cd ..
```

## Build

To build the entire project (API, Frontend, and CLI):

```bash
npm run build
```

## Compile

To compile the Compact smart contract specifically:

```bash
npm run compact
```

## Manual Deployment

Deployment is intentionally left for manual execution. Please run the following command to deploy your contract:

```bash
cd voting-cli
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod
```

## After Deployment

The only remaining manual steps are:

1. Deploy the Compact contract using the command above.
2. Copy the deployed contract address.
3. Replace `0x7a3f8b9e6c4d2a1f5e8d9c0b7a6f3e4d2c1b8a9f` everywhere it appears (including this README, `.env` files, and `src/hooks/useVotingContract.ts`).

## Environment Variables

- `VITE_API_URL` (Frontend): URL of the API server.
- `PORT` (API): Port for the Express server to run on.
- `CONTRACT_ADDRESS` (API/Frontend): The deployed address of the smart contract.

## Screenshots

*(Placeholder for Screenshots)*

## Initial Idea

*(Placeholder for Initial Idea)*

## Troubleshooting

- **Compact Compiler not found**: Ensure the path to the `compact` executable is correctly set in your environment variables.
- **Docker proof server failing**: Ensure Docker is running and port 6300 is available.
- **Wallet connection issues**: Refresh the page and ensure you have switched to the Midnight test network in your Lace wallet.
