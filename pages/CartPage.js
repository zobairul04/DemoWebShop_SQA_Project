export class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.page-title h1');
    this.productRows = page.locator('.cart-item-row');
  }

  getProductRow(productName) {
    return this.productRows.filter({
      has: this.page.getByRole('link', {
        name: productName,
        exact: true,
      }),
    });
  }

  getProductLink(productName) {
    return this.getProductRow(productName).getByRole('link', {
      name: productName,
      exact: true,
    });
  }

  getQuantityInput(productName) {
    return this.getProductRow(productName).locator('.qty-input');
  }
}