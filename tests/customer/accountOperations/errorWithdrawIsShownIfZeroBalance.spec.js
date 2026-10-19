import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert the customer cannot withdraw money with empty balance', async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Ron Weasly');
  await customerLoginPage.clickLoginButton();
  await customerAccountPage.assertAccountLineContainsText('Balance : 0');
  await customerAccountPage.clickWithdrawButton();

  const amount = faker.number.int(100).toString();

  await customerAccountPage.fillAmountInputField(amount);
  await customerAccountPage.clickWithdrawFormButton();
  await customerAccountPage.assertWithdrawNoBalanceErrorMessageIsVisible();
});
