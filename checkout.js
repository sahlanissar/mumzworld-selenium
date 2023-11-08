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
    // Full screeen
    options.addArguments('--start-maximized');
    // Open the main page
    await driver.get(baseUrl);
    let cartUrl = `${baseUrl}cart`

    await driver.get(baseUrl);
    await driver.wait(until.urlIs(baseUrl), shortTimeOut);

    let productName = "Simba Minnie Spring Palms Trolley"
    // search item
    await driver.findElement(By.css(`[type="search"]`)).sendKeys(productName)
    await driver.findElement(By.css(`[title="Submit your search query"]`)).click();

    // Expected search URL
    let searchUrl = baseUrl + "search.html?q=" + encodeURIComponent(productName)
    await driver.wait(until.urlIs(searchUrl), shortTimeOut);

    // Add to cart button
    await driver.wait(until.elementLocated(By.className('galleryCartButton-cartBuyIcon-3LD')), shortTimeOut);
    await driver.findElement(By.tagName('body')).click();
    // click on bag button
    await driver.findElement(By.css(`[aria-label="Add to Cart"]`)).click();

    // wait for success message
    let successCartClass = "feedbackPopup-success-2gz"
    let successCartMessage = "Successfully added to bag"
    let addTocartSuccessElement = By.className(successCartClass)
    await driver.wait(until.elementLocated(addTocartSuccessElement), shortTimeOut);
    await driver.wait(until.elementTextIs(driver.findElement(addTocartSuccessElement), successCartMessage), shortTimeOut);

    // click on view bag button
    let viewBag = By.css(`[title="View Bag"]`)
    await driver.findElement(viewBag).click()

    // Wait for cart page loading
    await driver.wait(until.urlIs(cartUrl), shortTimeOut);

    await driver.wait(until.elementLocated(By.className("orderSummary-stickySection-2NR")), 20000);

    // Increase qty to be 5 items

    for (let i = 1; i < 5; i++) {
        const increaseButton = By.xpath(`//*[@id="root"]/main/div[2]/div/div[2]/div[1]/div[1]/div/ul/li/div/div[2]/div/form/div/button[2]`)
        const quantityInput = By.name(`quantity`)
        await driver.wait(until.elementLocated(increaseButton), shortTimeOut);
        const increaseButtonElement = await driver.findElement(increaseButton);
        await driver.wait(until.elementLocated(quantityInput), shortTimeOut);
        await increaseButtonElement.click();
    }

    let itemCount = By.className('cartItemsQty-root-1IW')
    await driver.wait(until.elementLocated(itemCount), shortTimeOut);
    await driver.wait(until.elementTextIs(driver.findElement(itemCount), '5 items'), shortTimeOut);
    await driver.wait(until.elementLocated(By.className('cartPage-summary_container-3AF')), shortTimeOut);
    await driver.findElement(By.tagName('body')).click();
 
    // Click Proceed to checkout
    let checkout = By.className("proceedToCheckoutBtn-button-3S2")
    await driver.wait(until.elementLocated(checkout), mediumTimeOut);
    await driver.findElement(checkout).click()

    const signInUrl = `${baseUrl}sign-in`
    await driver.wait(until.urlIs(signInUrl), 20000);

    // Sign Up
    const signUp = By.className(`signLink-link-2ye`)
    await driver.wait(until.elementLocated(signUp), shortTimeOut);
    await driver.findElement(signUp).click()
    const signUpUrl = `${baseUrl}create-account`
    await driver.wait(until.urlIs(signUpUrl), mediumTimeOut);

    console.log('Test Passed: Product added to the wishlist successfully.');
  }
  catch (error) {
    console.error('Test Failed: ' + error.message);
  }
  finally {
    // Close the browser
    await driver.quit();
  }
})();