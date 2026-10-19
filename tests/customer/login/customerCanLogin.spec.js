import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';



test('Assert correct customer Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);
  const username = 'Neville Longbottom'

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();
  await customerLoginPage.selectCustomer(username);
  await customerLoginPage.clickLoginButton();
  await customerAccountPage.assertLogoutButtonIsVisible();
  await customerAccountPage.assertWelcomeMessageIsVisible(username);
});
