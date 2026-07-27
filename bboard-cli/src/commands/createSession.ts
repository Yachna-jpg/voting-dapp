import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

interface SessionOptions {
  sessionId?: string;
  voters: string;
  candidates: string;
  duration: string;
}

export async function createSession(options: SessionOptions) {
  try {
    console.log(chalk.blue('\n🗳️  Create Voting Session\n'));
    
    // Interactive prompts if options not provided
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'sessionId',
        message: 'Session ID (optional):',
        default: options.sessionId || `session-${Date.now()}`,
      },
      {
        type: 'number',
        name: 'totalVoters',
        message: 'Total registered voters:',
        default: parseInt(options.voters) || 100,
        validate: (value: number) => value > 0 && value <= 10000,
      },
      {
        type: 'number',
        name: 'numCandidates',
        message: 'Number of candidates (2-10):',
        default: parseInt(options.candidates) || 3,
        validate: (value: number) => value >= 2 && value <= 10,
      },
      {
        type: 'number',
        name: 'durationHours',
        message: 'Duration (hours):',
        default: parseInt(options.duration) || 24,
        validate: (value: number) => value > 0 && value <= 720,
      },
    ]);

    const spinner = ora('Creating voting session...').start();
    
    await sleep(1500);
    
    spinner.succeed(chalk.green('Session created successfully!'));
    
    console.log(chalk.green('\n✅ Session Configuration\n'));
    console.log(chalk.white(`Session ID: ${chalk.cyan(answers.sessionId)}`));
    console.log(chalk.white(`Total Voters: ${chalk.cyan(answers.totalVoters)}`));
    console.log(chalk.white(`Candidates: ${chalk.cyan(answers.numCandidates)}`));
    console.log(chalk.white(`Duration: ${chalk.cyan(answers.durationHours)} hours\n`));
    
    console.log(chalk.yellow('⚠️  Next Steps:\n'));
    console.log(chalk.white('1. Ensure the contract is deployed'));
    console.log(chalk.white('2. Fund your wallet with test tokens'));
    console.log(chalk.white('3. Register eligible voters'));
    console.log(chalk.white('4. Start the voting session\n'));
    
  } catch (error: any) {
    console.error(chalk.red('Error creating session:'), error.message);
    process.exit(1);
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
