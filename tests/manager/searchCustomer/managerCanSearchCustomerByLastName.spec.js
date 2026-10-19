import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let user;

test.beforeEach(async ({ page }) => {
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

test('Assert manager can search customer by Last Name', async ({ page }) => {
<<<<<<< HEAD
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
  const customersListPage = new CustomersListPage(page);
 
  await customersListPage.open();
  await customersListPage.searchCastomer(user.lastName)
=======
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.searchCustomer(user.lastName)
>>>>>>> fix-project
  await customersListPage.assertCellIsVisible(user.lastName);
  await customersListPage.assertHowManyRowIsPresent(1);
});
