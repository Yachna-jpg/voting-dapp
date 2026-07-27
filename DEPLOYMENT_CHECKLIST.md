# Deployment Checklist

## Pre-Deployment

- [ ] Compact compiler installed (v0.31.1+)
- [ ] Docker proof server running
- [ ] All dependencies installed
- [ ] Wallet installed and funded
- [ ] Git repository initialized

## Contract Deployment

- [ ] Contract compiles successfully (`compact build`)
- [ ] Proof server is running (`docker ps`)
- [ ] Network selected (preprod/mainnet)
- [ ] Deployment command executed
- [ ] Contract address saved

## Post-Deployment Updates

### Files to Update with Contract Address:

- [ ] `src/src/hooks/useVotingContract.ts` - Line 5
- [ ] `.env` file (create from `.env.example`)
- [ ] `src/.env` (if using separate frontend env)
- [ ] `api/.env` (if using separate API env)
- [ ] README.md - Contract Address section

### Environment Variables:

```env
CONTRACT_ADDRESS=0xYourDeployedContractAddress
VITE_API_URL=http://localhost:4000/api
NETWORK=preprod
```

## Testing

- [ ] Frontend loads without errors
- [ ] Wallet connects successfully
- [ ] Can create voting session
- [ ] Can cast vote
- [ ] Can view results
- [ ] API responds correctly

## Production Readiness

- [ ] Environment variables configured
- [ ] Error handling tested
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Screenshots added to README
- [ ] Git commits are meaningful (5+ commits)

## Rise In Submission Checklist

- [ ] Contract deployed on preprod
- [ ] Contract address in README
- [ ] All features working
- [ ] Privacy model documented
- [ ] Screenshots in README
- [ ] Initial idea section filled
- [ ] Git repository accessible
- [ ] At least 5 meaningful commits

---

**Tip**: Make incremental commits as you develop:
1. Initial scaffold
2. Contract implementation
3. Frontend setup
4. API integration
5. Final polish
