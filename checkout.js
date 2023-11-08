const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');


// Set up your Selenium WebDriver with the appropriate browser driver (e.g., Chrome, Firefox).
const options = new chrome.Options();
options.addArguments('--start-maximized'); // This argument opens the browser in full screen.
const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

// Website URLs
const baseUrl = 'https://www.mumzworld.com/en/';

// Start the test
(async function () {
  try {
    const shortTimeOut = 10000
    const mediumTimeOut = 25000
    // Open the main page
    await driver.get(baseUrl);
    await driver.wait(until.urlIs(baseUrl), mediumTimeOut);

    // Name of the product that I'm going to search
    let productName = "Simba Minnie Spring Palms Trolley"
    // search item
    await driver.findElement(By.css(`[type="search"]`)).sendKeys(productName)
    await driver.findElement(By.css(`[title="Submit your search query"]`)).click();

    // Expected search URL that we can expect search is success
    let searchUrl = baseUrl + "search.html?q=" + encodeURIComponent(productName)
    await driver.wait(until.urlIs(searchUrl), shortTimeOut);

    // ### Add to cart button
    //   Waiting for bag button appeares, so that I can proceed to click that
    await driver.wait(until.elementLocated(By.className('galleryCartButton-cartBuyIcon-3LD')), shortTimeOut);
    await driver.findElement(By.tagName('body')).click(); // need to click somewhere in the screen
    // click on bag button
    await driver.findElement(By.css(`[aria-label="Add to Cart"]`)).click();

    // wait for success message
    let successCartMessage = "Successfully added to bag"
    let addToBagSuccessElement = By.className("feedbackPopup-success-2gz") // success message element
    await driver.wait(until.elementLocated(addToBagSuccessElement), shortTimeOut);
    await driver.wait(until.elementTextIs(driver.findElement(addToBagSuccessElement), successCartMessage), shortTimeOut);

    // click on view bag button
    let viewBag = By.css(`[title="View Bag"]`)
    await driver.findElement(viewBag).click()

    // Wait for cart page loaded
    let cartUrl = baseUrl + 'cart'
    await driver.wait(until.urlIs(cartUrl), shortTimeOut);

    await driver.wait(until.elementLocated(By.className("orderSummary-stickySection-2NR")), shortTimeOut);

    // Increase qty to be 5 items

    for (let i = 1; i < 5; i++) {
        const increaseButton = By.xpath(`//*[@id="root"]/main/div[2]/div/div[2]/div[1]/div[1]/div/ul/li/div/div[2]/div/form/div/button[2]`)
        await driver.wait(until.elementLocated(increaseButton), shortTimeOut);
        await driver.findElement(increaseButton).click()
    }

    // Wait for 5 items text
    let itemCount = By.className('cartItemsQty-root-1IW')
    await driver.wait(until.elementLocated(itemCount), shortTimeOut);
    await driver.wait(until.elementTextIs(driver.findElement(itemCount), '5 items'), shortTimeOut);
    await driver.wait(until.elementLocated(By.className('cartPage-summary_container-3AF')), shortTimeOut);
    await driver.findElement(By.tagName('body')).click();
 
    // Click Proceed to checkout
    let checkout = By.className("proceedToCheckoutBtn-button-3S2")
    await driver.wait(until.elementLocated(checkout), mediumTimeOut);
    await driver.findElement(checkout).click()

    const signInUrl = baseUrl + 'sign-in'
    await driver.wait(until.urlIs(signInUrl), mediumTimeOut);

    // Sign Up
    const signUp = By.className(`signLink-link-2ye`) 
    await driver.wait(until.elementLocated(signUp), shortTimeOut); //wait for singup button found
    await driver.findElement(signUp).click()
  
    // waiting registration page appears
    const signUpUrl = baseUrl + 'create-account'
    await driver.wait(until.urlIs(signUpUrl), mediumTimeOut);

    // fill registration
    await driver.wait(until.elementLocated(By.className('createAccount-title-3rF')), mediumTimeOut);
    await driver.findElement(By.id('create_account_page_firstname')).sendKeys('Johny');
    await driver.findElement(By.id('create_account_page_lastname')).sendKeys('Doe');
    await driver.findElement(By.id('create_account_page_email')).sendKeys('johndoe2@gmail.com');
    await driver.findElement(By.id('create_account_page_password')).sendKeys('Pass@1233');
    await driver.findElement(By.className('createAccount-submitButton-1yp')).click(); // click on reg. submit button
    const checkoutUrl = baseUrl + 'checkout'
    await driver.wait(until.urlIs(checkoutUrl), mediumTimeOut);

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