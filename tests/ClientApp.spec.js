const {test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('@Web Browser Context Playwrite Test', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator('#username');
   const signIn = page.locator("#signInBtn");
   const itemType = page.locator(".card-body a");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   console.log(await page.title());
   await userName.fill("Rahul")
   await page.locator("[id='password']").fill("learning");
   await signIn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   console.log(await itemType.first().textContent());
   console.log(await itemType.nth(1).textContent());
   console.log(await itemType.allTextContents());

});

test('@Web Page Playwrite Test', async ({page})=>
{
   
   await page.goto("https://www.google.com")
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");

});

test('DropDown Handelling', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator('#username');
   const signIn = page.locator("#signInBtn");
   const dropDown = page.locator("select.form-control");
   const documentLink = page.locator("[href*='documents-request']");
   await dropDown.selectOption("Consultant");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   console.log(await page.locator(".radiotextsty").last().isChecked());
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class","blinkingText");

   //await page.pause();
   
});

test('Child Window Handelling', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");

   const [newPage] = await Promise.all([

   context.waitForEvent('page'),
    documentLink.click(),
   
   ])
   const text1 = await newPage.locator(".red").textContent();
   console.log(text1);
   const arryText = text1.split("@");
   const domain = arryText[1].split(" ")[0];
   console.log(domain);
   await page.locator('#username').fill(domain);
   //await page.pause();
   console.log(await page.locator('#username').inputValue());

});