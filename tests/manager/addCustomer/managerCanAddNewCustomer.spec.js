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

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(user.firstName);
  await addCustomerPage.fillLastNameField(user.lastName);
  await addCustomerPage.fillPostCodeField(user.postCode);


  await addCustomerPage.createCustomer();
  await addCustomerPage.reload();
  await addCustomerPage.clickCustomerButton();

  await customersListPage.assertCellIsVisible(user.firstName);
  await customersListPage.assertCellIsVisible(user.lastName);
  await customersListPage.assertCellIsVisible(user.postCode);
  await customersListPage.assertCustomerHasNoAccountNumber(user.firstName);

});
