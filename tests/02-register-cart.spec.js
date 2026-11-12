import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test('Q2 - Register login and add correct product to cart', async ({
  page,
}, testInfo) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  const user = {
    firstName: 'Test',
    lastName: 'Customer',
    email: `sqa_${randomUUID()}@example.com`,
    password: 'TestPassword123!',
  };

  const productName = 'Computing and Internet';
  const quantity = 1;

  await test.step('Register a new customer', async () => {
    await registerPage.open();
    await registerPage.register(user);

    await expect(registerPage.successMessage).toHaveText(
      'Your registration completed'
    );

    await expect(registerPage.logoutLink).toBeVisible();
  });

  await test.step('Log out and log in with the new account', async () => {
    await registerPage.logout();

    await expect(loginPage.loginLink).toBeVisible();

    await loginPage.open();
    await loginPage.login(user.email, user.password);

    await expect(loginPage.logoutLink).toBeVisible();

    await expect(
      page.locator('.header-links a.account')
    ).toHaveText(user.email);
  });

  await test.step('Open Books category and select product', async () => {
    await productPage.openBooksCategory();

    await expect(productPage.categoryTitle).toHaveText('Books');

    await productPage.selectProduct(productName);

    await expect(productPage.productTitle).toHaveText(
      productName
    );
  });

  await test.step('Add product to cart', async () => {
    await productPage.addToCart(quantity);

    await expect(productPage.notification).toBeVisible();

    await expect(productPage.notification).toContainText(
      'The product has been added to your shopping cart'
    );
  });

  await test.step('Verify cart product and quantity', async () => {
    await productPage.openCart();

    await expect(page).toHaveURL(/\/cart(?:\?.*)?$/);

    await expect(cartPage.title).toHaveText('Shopping cart');

    await expect(cartPage.productRows).toHaveCount(1);

    await expect(
      cartPage.getProductLink(productName)
    ).toBeVisible();

    await expect(
      cartPage.getQuantityInput(productName)
    ).toHaveValue(String(quantity));
  });

  await testInfo.attach('Cart product and quantity screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});