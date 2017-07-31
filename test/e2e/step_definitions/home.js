var homePage = require('../page_object/pages/homePage');

var HomeSteps = function () {

    this.navigateTo = function() {
        return browser.get(homePage.url)
    };

    this.homePageShouldBeDisplayed = function() {
        return homePage.body.isDisplayed().then(function (isDisplayed) {
            return expect(isDisplayed).toBe(true)
        })
    };

    this.executeSearch = function(text) {
        return homePage.searchField.sendKeys(text).then(function() {
            return homePage.searchButton.click()
        });
    }

    this.validateSearchMessage = function() {
        return homePage.searchMessage.getText().then(function(text) {
            return expect(text).toEqual('No data. Feel free to add new one.');
        });
    }
};

module.exports = new HomeSteps();

