const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const assert = require('assert');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');


// Set up your Selenium WebDriver with the appropriate browser driver (e.g., Chrome, Firefox).
const options = new chrome.Options();
options.addArguments('--start-maximized'); // This argument opens the browser in full screen.
const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

// Website URLs
const baseUrl = 'https://www.mumzworld.com/en/';

// User credentials
const username = 'sahlanissar123@gmail.com';
const password = 'Sahlanissar@123';

// Start the test
(async function () {
  try {
    // Full screeen
    options.addArguments('--start-maximized');
    // Open the main page
    await driver.get(baseUrl);

    const loginButton = await driver.findElement(By.css(`[title="Login"]`));
    let cartUrl = `${baseUrl}cart`

    // Click on the login button
    await loginButton.click();

    // // Fill in the login form and submit
    await driver.findElement(By.name('email')).sendKeys(username);
    await driver.findElement(By.name('password')).sendKeys(password);
    await driver.findElement(By.css(`[title="Sign in"]`)).click();

    // // Wait for login to complete
    const userClassName = "accountTrigger-triggerText-1Mu"
    await driver.wait(until.elementTextIs(driver.findElement(By.className(userClassName)), 'Hi, sahla'), 10000);


    // CLEAR CART
    await driver.get(cartUrl);
    await driver.wait(until.urlIs(cartUrl), 10000);

    await driver.wait(until.elementLocated(By.className('cartPage-heading-3f_')), 10000);
    await driver.wait(until.elementTextIs(driver.findElement(By.className('cartPage-heading-3f_')), 'Shopping bag'), 10000);

    // Locate all "Remove" buttons for items in the cart.
    const removeButtons = await driver.findElements(By.className('product-removeItem-2gC'));

    // Click each "Remove" button to clear the cart.
    for (const button of removeButtons){
      await button.click();
    }

    // CLEAR CART
    await driver.get(baseUrl);
    await driver.wait(until.urlIs(baseUrl), 10000);

    let productName = "Simba Minnie Spring Palms Trolley"
    // search item 
    await driver.findElement(By.css(`[type="search"]`)).sendKeys(productName)
    await driver.findElement(By.css(`[title="Submit your search query"]`)).click();


    // Expected search URL
    let searchUrl = baseUrl + "search.html?q=" + encodeURIComponent(productName)
    await driver.wait(until.urlIs(searchUrl), 10000);

    // Add to cart button
    await driver.wait(until.elementLocated(By.className('galleryCartButton-cartBuyIcon-3LD')), 10000);
    await driver.findElement(By.tagName('body')).click();
    // click on bag button
    await driver.findElement(By.css(`[aria-label="Add to Cart"]`)).click();

    // wait for success message
    let successCartClass = "feedbackPopup-success-2gz"
    let successCartMessage = "Successfully added to bag"
    let addTocartSuccessElement = By.className(successCartClass)
    await driver.wait(until.elementLocated(addTocartSuccessElement), 10000);
    await driver.wait(until.elementTextIs(driver.findElement(addTocartSuccessElement), successCartMessage), 10000);


    // click on view bag button
    let viewBag = By.css(`[title="View Bag"]`)
    await driver.findElement(viewBag).click()

    // Wait for cart page loading
    await driver.wait(until.urlIs(cartUrl), 20000);


    // Increase qty to be 5 items

    for (let i = 1; i <= 4; i++) {
        const increaseButton = By.xpath(`//*[@id="root"]/main/div[2]/div/div[2]/div[1]/div[1]/div/ul/li/div/div[2]/div/form/div/button[2]`)
        const quantityInput = By.name(`quantity`)
        await driver.wait(until.elementLocated(increaseButton), 10000);
        const increaseButtonElement = await driver.findElement(increaseButton);
        // await driver.wait(until.elementLocated(quantityInput), 10000);
        await increaseButtonElement.click();
        console.log(i)
    }

    // Click Proceed to checkout
    // title="Proceed to Checkout"
    let checkout = By.css(`[title="Proceed to Checkout"]`)
    await driver.findElement(checkout).click()
    

    console.log('Test Passed: Product added to the wishlist successfully.');
  } catch (error) {
    console.error('Test Failed: ' + error.message);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
