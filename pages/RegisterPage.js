export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.genderMale = page.locator('#gender-male');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');

    this.registerButton = page.locator('#register-button');
    this.successMessage = page.locator('.result');
    this.logoutLink = page.locator('a.ico-logout');
  }

  async open() {
    await this.page.goto('/register');
  }

  async register(user) {
    await this.genderMale.check();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}