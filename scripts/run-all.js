import { execSync } from 'node:child_process';

const tasks = [
  ['UI Automation', 'npm run test:ui'],
  ['API Automation', 'npm run test:api'],
];

let hasFailures = false;

for (const [name, command] of tasks) {
  console.log(`\n========== ${name} ==========\n`);

  try {
    execSync(command, {
      stdio: 'inherit',
    });

    console.log(`${name}: PASSED`);
  } catch (error) {
    hasFailures = true;
    console.error(`${name}: FAILED`);
  }
}

console.log('\n========== FINAL RESULT ==========');

if (hasFailures) {
  console.error('One or more test suites failed.');
  process.exitCode = 1;
} else {
  console.log('All UI and API test suites passed.');
}