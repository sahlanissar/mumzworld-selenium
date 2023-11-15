const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');


// Set up your Selenium WebDriver with the appropriate browser driver (e.g., Chrome, Firefox).
const options = new chrome.Options();
options.addArguments('--start-maximized'); // This argument opens the browser in full screen.
const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();



(async function () {
    try {

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