import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let user; 

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
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
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
 const addCustomerPage = new AddCustomerPage(page);
 const customersListPage = new CustomersListPage(page);

 await addCustomerPage.clickCustomerButton();
 await customersListPage.deleteCustomer(user.firstName);
 await customersListPage.assertCustomerIsNotPresent(user.firstName);
 await customersListPage.reload();
 await customersListPage.assertCustomerIsNotPresent(user.firstName)
});
