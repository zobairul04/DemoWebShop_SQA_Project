import newman from 'newman';
import {
  readFileSync,
  rmSync,
  mkdirSync,
} from 'node:fs';
import { execSync } from 'node:child_process';

const mode = process.argv[2] || 'all';

const requestNames = {
  get: '01 - GET All Users',
  put: '02 - PUT Update User',
};

if (!['all', 'get', 'put'].includes(mode)) {
  console.error('Unknown mode. Use all, get or put.');
  process.exit(1);
}

const collection = JSON.parse(
  readFileSync(
    './api-tests/users.postman_collection.json',
    'utf8'
  )
);

// For individual execution, keep only the selected request.
if (mode !== 'all') {
  collection.item = collection.item.filter(
    (item) => item.name === requestNames[mode]
  );

  if (collection.item.length !== 1) {
    console.error('Request not found. Check the Postman request name.');
    process.exit(1);
  }
}

// Keep separate reports for all, GET and PUT runs.
const reportDirectory = `reports/api/${mode}`;

rmSync(reportDirectory, {
  recursive: true,
  force: true,
});

mkdirSync(reportDirectory, {
  recursive: true,
});

newman.run(
  {
    collection,
    iterationCount: 1,
    timeoutRequest: 30000,
    timeoutScript: 60000,

    reporters: ['cli', 'htmlextra', 'allure'],

    reporter: {
      htmlextra: {
        export: `${reportDirectory}/api-report.html`,
        title: `API Tests - ${mode}`,
      },

      allure: {
        resultsDir: `${reportDirectory}/allure-results`,
      },
    },
  },

  function (error, summary) {
    let failed = false;

    if (error) {
      console.error(error);
      failed = true;
    }

    if (!summary || summary.run.failures.length > 0) {
      failed = true;
    }

    // Generate Allure even when assertions fail.
    try {
      execSync(
        `npx allure generate ${reportDirectory}/allure-results --clean -o ${reportDirectory}/allure-report`,
        { stdio: 'inherit' }
      );
    } catch (reportError) {
      console.error('Allure report generation failed.');
      failed = true;
    }

    process.exitCode = failed ? 1 : 0;
  }
);