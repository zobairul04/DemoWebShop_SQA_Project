export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstName = page.locator('#BillingNewAddress_FirstName');
    this.lastName = page.locator('#BillingNewAddress_LastName');
    this.email = page.locator('#BillingNewAddress_Email');
    this.country = page.locator('#BillingNewAddress_CountryId');
    this.city = page.locator('#BillingNewAddress_City');
    this.address = page.locator('#BillingNewAddress_Address1');
    this.zipCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phone = page.locator('#BillingNewAddress_PhoneNumber');

    this.billingContinue = page.locator(
      '#billing-buttons-container input.new-address-next-step-button'
    );

    this.shippingContinue = page.locator(
      '#shipping-buttons-container input.new-address-next-step-button'
    );

    this.groundShipping = page.getByLabel(/Ground/);

    this.shippingMethodContinue = page.locator(
      '#shipping-method-buttons-container input.shipping-method-next-step-button'
    );

    this.cashOnDelivery = page.locator(
      'input[value="Payments.CashOnDelivery"]'
    );

    this.paymentMethodContinue = page.locator(
      '#payment-method-buttons-container input.payment-method-next-step-button'
    );

    this.paymentInfoContinue = page.locator(
      '#payment-info-buttons-container input.payment-info-next-step-button'
    );

    this.confirmButton = page.locator(
      '#confirm-order-buttons-container input.confirm-order-next-step-button'
    );
  }

  async fillBillingAddress(user, address) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);

    await this.country.selectOption({
      label: address.country,
    });

    await this.city.fill(address.city);
    await this.address.fill(address.street);
    await this.zipCode.fill(address.zipCode);
    await this.phone.fill(address.phone);

    await this.billingContinue.click();
  }

  async continueShippingAddress() {
    // Wait until checkout opens either shipping address
    // or shipping method.
    await this.page.locator(
      '#opc-shipping.active, #opc-shipping_method.active'
    ).waitFor({ state: 'visible' });

    const shippingAddressStep = this.page.locator(
      '#opc-shipping.active'
    );

    if (await shippingAddressStep.isVisible()) {
      // The new billing address is available as the shipping address.
      await this.shippingContinue.click();
    }
  }

  async selectShippingMethod() {
    await this.groundShipping.check();
    await this.shippingMethodContinue.click();
  }

  async selectPaymentMethod() {
    await this.cashOnDelivery.check();
    await this.paymentMethodContinue.click();
  }

  async continuePaymentInformation() {
    await this.paymentInfoContinue.click();
  }

  async confirmOrder() {
    await this.confirmButton.click();
  }
}