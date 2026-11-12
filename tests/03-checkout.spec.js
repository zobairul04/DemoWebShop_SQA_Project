import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { SearchPage } from '../pages/SearchPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { OrderPage } from '../pages/OrderPage.js';

test('Q3 - Search product and complete an order', async ({
  page,
}, testInfo) => {
  test.setTimeout(180000);

  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderPage = new OrderPage(page);

  const user = {
    firstName: 'Test',
    lastName: 'Buyer',
    email: `sqa_${randomUUID()}@example.com`,
    password: 'TestPassword123!',
  };

  const address = {
    country: 'Bangladesh',
    city: 'Dhaka',
    street: '123 Test Road',
    zipCode: '1207',
    phone: '01700000000',
  };

  const productName = 'Computing and Internet';
  const quantity = 2;

  let confirmedOrderNumber;

  await test.step('Create an independent customer account', async () => {
    await registerPage.open();
    await registerPage.register(user);

    await expect(registerPage.successMessage).toHaveText(
      'Your registration completed'
    );

    await registerPage.logout();
    await expect(loginPage.loginLink).toBeVisible();

    await loginPage.open();
    await loginPage.login(user.email, user.password);

    await expect(loginPage.logoutLink).toBeVisible();

    await expect(
      page.locator('.header-links a.account')
    ).toHaveText(user.email);
  });

  await test.step('Search and verify the correct product', async () => {
    await searchPage.search(productName);

    await expect(
      searchPage.getProductLink(productName)
    ).toBeVisible();

    await searchPage.openProduct(productName);

    await expect(productPage.productTitle).toHaveText(
      productName
    );
  });

  await test.step('Increase quantity and add product to cart', async () => {
    await expect(productPage.quantityInput).toHaveValue('1');

    await productPage.addToCart(quantity);

    await expect(productPage.quantityInput).toHaveValue('2');

    await expect(productPage.notification).toContainText(
      'The product has been added to your shopping cart'
    );
  });

  await test.step('Verify cart and agree to terms', async () => {
    await productPage.openCart();

    await expect(cartPage.title).toHaveText('Shopping cart');
    await expect(cartPage.productRows).toHaveCount(1);

    await expect(
      cartPage.getProductLink(productName)
    ).toBeVisible();

    await expect(
      cartPage.getQuantityInput(productName)
    ).toHaveValue(String(quantity));

    await cartPage.agreeToTerms();
    await expect(cartPage.agreeCheckbox).toBeChecked();

    await cartPage.checkout();
  });

  await test.step('Enter billing and shipping address', async () => {
    await checkoutPage.fillBillingAddress(user, address);
    await checkoutPage.continueShippingAddress();
  });

  await test.step('Select Ground shipping', async () => {
    await checkoutPage.selectShippingMethod();
  });

  await test.step('Select Cash on Delivery', async () => {
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.continuePaymentInformation();
  });

  await test.step('Confirm order and verify success', async () => {
    await checkoutPage.confirmOrder();

    await expect(orderPage.successMessage).toHaveText(
      'Your order has been successfully processed!'
    );

    confirmedOrderNumber = await orderPage.getOrderNumber();

    await testInfo.attach('Order confirmation', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('Open and verify order details', async () => {
    await orderPage.openOrderDetails();

    await expect(orderPage.detailsPage).toBeVisible();

    await expect(orderPage.orderNumber).toContainText(
      confirmedOrderNumber
    );

    const productRow = orderPage.getProductRow(productName);

    await expect(productRow).toHaveCount(1);

    await expect(
      productRow.getByRole('link', {
        name: productName,
        exact: true,
      })
    ).toBeVisible();

    const orderTable = productRow.locator('xpath=ancestor::table');

const quantityHeader = orderTable.getByRole('columnheader', {
  name: /^(qty\.?|quantity)$/i,
});

await expect(quantityHeader).toBeVisible();

const quantityColumn = await quantityHeader.evaluate(
  (header) => header.cellIndex
);

await expect(
  productRow.locator('td').nth(quantityColumn)
).toHaveText(new RegExp(`^\\s*Quantity:\\s*${quantity}\\s*$`));

    await testInfo.attach('Order details', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});