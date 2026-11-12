export class ProductPage {
  constructor(page) {
    this.page = page;

    this.booksLink = page
      .locator('.top-menu')
      .getByRole('link', { name: 'Books', exact: true });

    this.categoryTitle = page.locator('.page-title h1');
    this.productTitle = page.locator('.product-name h1');

    this.quantityInput = page.locator(
      '.product-essential .qty-input'
    );

    this.addToCartButton = page.locator(
      '.product-essential .add-to-cart-button'
    );

    this.notification = page.locator('#bar-notification');
    this.cartLink = page.locator('.header-links a.ico-cart');
  }

  async openBooksCategory() {
    await this.booksLink.click();
  }

  async selectProduct(productName) {
    await this.page
      .locator('.product-title')
      .getByRole('link', {
        name: productName,
        exact: true,
      })
      .click();
  }

  async addToCart(quantity) {
    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}