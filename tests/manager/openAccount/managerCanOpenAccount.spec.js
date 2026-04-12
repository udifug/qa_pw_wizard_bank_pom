import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let user; 

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
 const addCustomerPage = new AddCustomerPage(page);
 
   user = { 
   firstName: faker.person.firstName(),
   lastName: faker.person.lastName(),
   postCode: faker.location.zipCode()
  }
 
  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(user.firstName);
  await addCustomerPage.fillLastNameField(user.lastName);
  await addCustomerPage.fillPostCodeField(user.postCode);
  await addCustomerPage.createCustomer();
  await addCustomerPage.reload();

});

test('Assert manager can open a new account for a customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
 const bankHomePage = new BankHomePage(page);
 const bankManagerMainPage = new BankManagerMainPage(page)
 const openAccountPage = new OpenAccountPage(page);

 await bankHomePage.open();
 await bankHomePage.clickBankManagerLoginButton();
 await bankManagerMainPage.openAccountButtonClick();

 await openAccountPage.selectCustomer(user.firstName, user.lastName);
 await openAccountPage.selectCurrencyValue('Dollar')
 await openAccountPage.clickProcessButton();
 await openAccountPage.reload();
 
 await bankManagerMainPage.customersButtonClick();

 const customersListPage = new CustomersListPage(page);
 await customersListPage.assertCustomerHasAccountNumber(user.firstName);
});
