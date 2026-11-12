import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';

const commands = {
  q1: 'npx playwright test tests/01-invalid-login.spec.js',
  all: 'npx playwright test',
};

const selected = process.argv[2] || 'all';

if (!commands[selected]) {
  console.error('Unknown scenario. Use q1 or all.');
  process.exit(1);
}

// Remove generated results from the previous UI run.
const generatedFolders = [
  'allure-results',
  'allure-report',
  'playwright-report',
  'test-results',
];

for (const folder of generatedFolders) {
  rmSync(folder, { recursive: true, force: true });
}

let testExitCode = 0;
let reportExitCode = 0;

try {
  execSync(commands[selected], { stdio: 'inherit' });
} catch (error) {
  testExitCode = error.status || 1;
} finally {
  try {
    execSync('npm run report:generate', {
      stdio: 'inherit',
    });
  } catch (error) {
    reportExitCode = error.status || 1;
  }
}

process.exitCode = testExitCode || reportExitCode;