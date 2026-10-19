import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert correct customer Logout', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();
  await customerLoginPage.selectCustomer('Neville Longbottom');
  await customerLoginPage.clickLoginButton();
  await customerAccountPage.clickLogoutButton();
  await customerLoginPage.waitForOpened();
  await customerLoginPage.assertSelectCustomerDropdownIsVisible();
  await customerLoginPage.assertSelectCustomerDropdownContainsValue('');
});
