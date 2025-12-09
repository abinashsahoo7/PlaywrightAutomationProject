const {test,expect} = require('@playwright/test');
const { on } = require('events');

test("Popup validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept())
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    await page.pause();
    const framePage =  page.frameLocator("#courses-iframe")
    //await framePage.locator("button[type = 'button']").click();
    await framePage.locator("a[href*='#/all-access-subscription']:visible").click();
    const textCheck = await framePage.locator(".hero-shapes p").textContent();
    console.log(textCheck);

})

test("Screenshot and Visula Comparision",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

})

test.only("Visual Testing",async({page})=>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

});
