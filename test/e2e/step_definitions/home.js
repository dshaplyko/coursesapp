var homePage = require('../page_object/pages/homePage');

var HomeSteps = function () {

    this.navigateTo = function() {
        return browser.get(homePage.url)
    };

    this.homePageShouldBeDisplayed = function() {
        return homePage.body.isDisplayed().then(function (isDisplayed) {
            return expect(isDisplayed).toBe(true)
        })
    }

};

module.exports = new HomeSteps();