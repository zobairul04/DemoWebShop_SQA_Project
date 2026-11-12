export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('.search-box-button');
  }

  async search(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  getProductLink(productName) {
    return this.page
      .locator('.product-title')
      .getByRole('link', {
        name: productName,
        exact: true,
      });
  }

  async openProduct(productName) {
    await this.getProductLink(productName).click();
  }
}