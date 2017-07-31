var loginPage = require('../page_object/pages/loginPage');

var LoginSteps = function () {

    this.navigateTo = function() {
        return browser.get(loginPage.url)
    };

    this.checkWelcomeText = function () {
        return expect(loginPage.loginTitle.getText()).toEqual('Sign in to Courses');
    }
};

module.exports = new LoginSteps();

