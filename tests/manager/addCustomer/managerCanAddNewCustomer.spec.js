import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode()
  }

<<<<<<< HEAD
  2. Do not rely on the customer row id for the steps 8-11. 
    Use the ".last()" locator to get the last row.
  */
 const addCustomerPage = new AddCustomerPage(page);
 const customersListPage = new CustomersListPage(page);
=======
  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(user.firstName);
  await addCustomerPage.fillLastNameField(user.lastName);
  await addCustomerPage.fillPostCodeField(user.postCode);
>>>>>>> fix-project


  await addCustomerPage.createCustomer();
  await addCustomerPage.reload();
  await addCustomerPage.clickCustomerButton();

<<<<<<< HEAD
 await customersListPage.assertCellIsVisible(user.firstName);
 await customersListPage.assertCellIsVisible(user.lastName);
 await customersListPage.assertCellIsVisible(user.postCode);
 await customersListPage.assertCustomerHasNoAccountNumber(user.firstName);
=======
  await customersListPage.assertCellIsVisible(user.firstName);
  await customersListPage.assertCellIsVisible(user.lastName);
  await customersListPage.assertCellIsVisible(user.postCode);
  await customersListPage.assertCustomerHasNoAccountNumber(user.firstName);
>>>>>>> fix-project

});
