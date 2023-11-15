const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');


// Set up your Selenium WebDriver with the appropriate browser driver (e.g., Chrome, Firefox).
const options = new chrome.Options();
options.addArguments('--start-maximized'); // This argument opens the browser in full screen.
const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();


//website url
const baseUrl = 'https://www.mumzworld.com/en/';

(async function () {
  try {
    const shortTimeOut = 10000;
    const mediumTimeOut = 25000;

    // 1.click on 'https://www.mumzworld.com/en/'
    await driver.get(baseUrl);
    await driver.wait(until.urlIs(baseUrl), mediumTimeOut);

    //Scroll home page 
    await driver.executeScript('window.scrollBy(0, 5000);');



    //2.find text login 
    //3.click on login

    const log = By.css("[title='Login']")
    await driver.wait(until.elementLocated(log), shortTimeOut);
    await driver.findElement(log).click()

    // 3.wait for login popup
    // 4.Verify the title
    const popupTitle = By.className("signIn-title-1Ds")
    await driver.wait(until.elementLocated(popupTitle), shortTimeOut);
    await driver.wait(until.elementTextIs(driver.findElement(popupTitle), 'Sign in to your mumzworld account'), shortTimeOut);

    //5.click on Email and enter sahla1@gmail.com
    const emailtext = By.id("sign_in_modal_email");
    await driver.findElement(emailtext).sendKeys('Sahla1@gmail.com');

    //6.click on password and enter *****
    const pass = By.id("sign_in_modal_password");
    await driver.findElement(pass).sendKeys('Sahlanissar@123');

    //7.click on signin button 


    const signbutton = By.css("[title='Sign in']")
    await driver.findElement(signbutton).click();

    console.log('Test Passed!!');
  }
  catch (error) {
    console.error('Test Failed: ' + error.message);
  }
  finally {
    // Close the browser
    await driver.quit();
  }
})();