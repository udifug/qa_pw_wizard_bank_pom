import { expect } from '@playwright/test';

export class CustomerLoginPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.getByTestId('userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/customer');
  }

  async reload() {
    await this.page.reload();
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/customer',
    );
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption(customerName);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async assertSelectCustomerDropdownIsVisible() {
    await expect(this.customerDropDown).toBeVisible();
  }

  async assertSelectCustomerDropdownContainsValue(value) {
    const currentOptionText = this.customerDropDown;
    await expect(currentOptionText).toHaveValue(value);
  }
}
