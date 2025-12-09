const {test,expect,request} = require('@playwright/test');
const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
let token;

test.beforeAll( async()=>
{
   const apiContext =  await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
   {
      data:loginPayload
   })
   expect(loginResponse.ok()).toBeTruthy();
   const loginResponseJson = await loginResponse.json();
   token = loginResponseJson.token;
   console.log(token);

});

test.beforeEach( ()=>
{

})



test.only('Browser Context Playwrite Test', async ({page} )=>
{
   
 

   //await page.goto("https://rahulshettyacademy.com/client");  
   //console.log(await page.title());
   //await userName.fill("anshika@gmail.com")
   //await passWord.fill("Iamking@000");
   //await logIn.click();
   //await page.waitForLoadState('networkidle');
const userName = page.locator('#userEmail');
   const passWord = page.locator("#userPassword");
   const logIn = page.locator("#login");
   const itemType = page.locator(".card-body b");
   const products = page.locator(".card-body")
   const productName = "ZARA COAT 3";

   
   await itemType.first().waitFor();
   const titles = await itemType.allTextContents();
   console.log(titles)
   const proCounts = await products.count();
   for(let i=0; i<proCounts; i++)
   {
      if(await products.nth(i).locator("b").textContent() == productName)
      {
         await products.nth(i).locator("text = Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*=Country]").pressSequentially("ind");
   const dropDown = page.locator(".ta-results");
   await dropDown.waitFor();
   const optionsCount = await dropDown.locator("button").count();
   for(let i=0; i<optionsCount; i++)
   {
      const text = await dropDown.locator("button").nth(i).textContent();
      if(text === " India")
      {
         await dropDown.locator("button").nth(i).click();
         break;
      }
   }
   expect(page.locator(".user__name [type=text]").first()).toHaveText("anshika@gmail.com");
   await page.locator(".action__submit ").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   await page.locator("button[routerlink*=myorders]").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr")
   for(let i=0;i< await rows.count();i++)
   {
      const rowOrder = await rows.nth(i).locator("th").textContent();
      if(orderId.includes(rowOrder))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   await page.pause();



});