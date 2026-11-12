import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('Q1 - Invalid login displays an error and keeps user logged out', async ({
  page,
}, testInfo) => {
  const loginPage = new LoginPage(page);

  const invalidEmail = `invalid_${Date.now()}@example.com`;
  const invalidPassword = 'WrongPassword123!';

  await test.step('Open login page', async () => {
    await loginPage.open();
  });

  await test.step('Submit invalid credentials', async () => {
    await loginPage.login(invalidEmail, invalidPassword);
  });

  await test.step('Verify login error message', async () => {
    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toContainText(
      'Login was unsuccessful. Please correct the errors and try again.'
    );
  });

  await test.step('Verify user is not logged in', async () => {
    await expect(page).toHaveURL(/\/login(?:\?.*)?$/);
    await expect(loginPage.loginLink).toBeVisible();
    await expect(loginPage.logoutLink).toHaveCount(0);
  });

  await testInfo.attach('Invalid login error screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});