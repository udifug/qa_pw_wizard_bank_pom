import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
    this.customerRow = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async reload(){
    await this.page.reload();
  }

   async assertCellIsVisible(value){
    await expect(this.page.getByRole('cell', { name: value })).toBeVisible();
   }

  async assertCustomerHasNoAccountNumber(firstName){
    await expect(this.page.getByRole('row', { name: firstName }).getByRole('cell').nth(3)).toBeEmpty();
  }

  async deleteCustomer(firstName){
    await this.page.getByRole('row', { name: firstName }).getByRole('button').click();
  }

  async assertCustomerIsNotPresent(firstName){
    await expect(this.page.getByRole('cell', { name: firstName })).toBeHidden();
  }

  async assertCustomerHasAccountNumber(firstName){
    await expect(this.page.getByRole('row', { name: firstName }).getByRole('cell').nth(3)).toBeVisible();
  }

  async searchCustomer(firstName){
    await this.searchCustomerField.fill(firstName);
  }
  async assertHowManyRowIsPresent(value){
    await expect(this.customerRow).toHaveCount(value)
  }
}
