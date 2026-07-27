#!/usr/bin/env node

import { Command } from 'commander';
import { deploy } from './commands/deploy.js';
import { createSession } from './commands/createSession.js';

const program = new Command();

program
  .name('voting-cli')
  .description('CLI for Voting DApp deployment and management')
  .version('1.0.0');

program
  .command('deploy')
  .description('Deploy the voting contract')
  .option('-n, --network <network>', 'Network to deploy to (preprod, mainnet)', 'preprod')
  .option('-f, --force', 'Force deployment even if already deployed', false)
  .action(deploy);

program
  .command('create-session')
  .description('Create a new voting session')
  .option('-s, --session-id <id>', 'Session identifier')
  .option('-v, --voters <number>', 'Total number of voters', '100')
  .option('-c, --candidates <number>', 'Number of candidates', '3')
  .option('-d, --duration <hours>', 'Duration in hours', '24')
  .action(createSession);

program.parse();
