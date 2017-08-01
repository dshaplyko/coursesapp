var homePage = require('../page_object/pages/homePage');

var HomeSteps = function () {

    this.navigateTo = () => {
        return browser.get(homePage.url)
    };

    this.homePageShouldBeDisplayed = () => {
        return homePage.body.isDisplayed().then((isDisplayed) => {
            return expect(isDisplayed).toBe(true)
        })
    };

    this.executeSearch = text => {
        return homePage.searchField.sendKeys(text).then(() => {
            return homePage.searchButton.click()
        });
    }

    this.validateSearchMessage = function() {
        return homePage.searchMessage.getText().then((text) => {
            return expect(text).toEqual('No data. Feel free to add new one.');
        });
    }
};

module.exports = new HomeSteps();

