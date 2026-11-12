export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.getByRole('button', {
      name: 'Log in',
      exact: true,
    });

    this.errorMessage = page.locator('.validation-summary-errors');

    this.loginLink = page.locator('a.ico-login');
    this.logoutLink = page.locator('a.ico-logout');
  }

  async open() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}