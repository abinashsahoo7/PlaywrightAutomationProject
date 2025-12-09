const { When, Then, Given} = require('@cucumber/cucumber')
const {expect} = require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');


Given('Login in to ecommerce application with {string} and {string}',{timeout : 100*1000}, async function (username, password) {
    
    //js file- Login js, DashboardPage
     const products = this.page.locator(".card-body");
     const loginPage = this.poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
         });

When('Add {string} to cart',{timeout : 100*1000}, async function (productName) {
     this.dashboardPage = this.poManager.getDashboardPage();
     await this.dashboardPage.searchProductAddCart(productName);
     await this.dashboardPage.navigateToCart();
         });
         
         
 Then('Verify {string} is displayed in the cart',{timeout : 100*1000}, async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
         });    
         
 When('Enter valid details and place the order',{timeout : 100*1000}, async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
         });
         
 Then('Verify order present in order history page',async function () {
   await this.dashboardPage.navigateToOrders();
   const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
         });   
         
    Given('Login in to Ecommerce2 application with {string} and {string}',async function (username, password) {
     const userName = this.page.locator('#username');
     const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(username)
    await this.page.locator("[id='password']").fill(password);
    await signIn.click();
    });

    Then('Verify error meaasage is displayed',async function () {
      console.log(await this.page.locator("[style*='block']").textContent());
      await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
    });