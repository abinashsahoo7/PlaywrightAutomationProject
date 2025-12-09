const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test')

async function writeExcelTest(searchText,replaceText,change,filePath)
{
    
const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath);
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet,searchText);
 
 const cell = worksheet.getCell(output.row,output.coulum+change.colChange);
 cell.value=replaceText;
 await workbook.xlsx.writeFile(filePath);

}


async function readExcel(worksheet,searchText)
{
    let output = {row:-1,coulum:-1}
    worksheet.eachRow((row,rowNumber) =>
 {
    row.eachCell((cell,colNumber) =>
    {
        //console.log(cell.value);
        if(cell.value === searchText)
        {
            console.log(rowNumber);
            console.log(colNumber);
            output.row=rowNumber;
            output.coulum=colNumber;
        }


    })

 })
 return output;
}
//writeExcelTest("Banana","Republic","C:/Users/abinsaho/Downloads/exceldownloadtest.xlsx");
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/abinsaho/Downloads/exceldownloadtest.xlsx");

test("Upload and Download test",async ({page}) =>
{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
   // await page.pause();
    //await page.locator("#downloadButton").click();
    //await page.pause();
    const d1 = await downloadPromise;
    const filePath = 'C:/Users/abinsaho/Downloads/download.xlsx'; // or await dl.path()
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);


    //writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/abinsaho/Downloads/download.xlsx");
    //await page.locator("#fileinput").click();
    //await page.locator("#fileinput").setInputFiles("C:/Users/abinsaho/Downloads/download.xlsx")

    



});



