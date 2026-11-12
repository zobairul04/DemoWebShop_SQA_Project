export class OrderPage {
  constructor(page) {
    this.page = page;

    this.successMessage = page.locator(
      '.order-completed .title'
    );

    this.completedOrderDetails = page.locator(
      '.order-completed .details'
    );

    this.orderDetailsLink = page.getByRole('link', {
      name: /Click here for order details/i,
    });

    this.detailsPage = page.locator('.order-details-page');

    this.orderNumber = this.detailsPage.locator('.order-number');
  }

  async getOrderNumber() {
    const text = await this.completedOrderDetails.innerText();
    const match = text.match(/Order number:\s*(\d+)/i);

    if (!match) {
      throw new Error(`Order number not found: ${text}`);
    }

    return match[1];
  }

  async openOrderDetails() {
    await this.orderDetailsLink.click();
  }

  getProductRow(productName) {
    return this.detailsPage.locator('tr').filter({
      has: this.page.getByRole('link', {
        name: productName,
        exact: true,
      }),
    });
  }
}