var loginPage = require('../page_object/pages/loginPage');

var LoginSteps = function () {

    this.navigateTo = function() {
        return browser.get(loginPage.url)
    };

    this.checkWelcomeText = function () {
        return loginPage.loginTitle.getText().then(function(text) {
            return expect(text).toEqual('Sign in to Courses');  
        });
    };

    this.loginFormShouldBeDisplayed = function () {
        return loginPage.loginForm.isDisplayed().then(function(isDisplayed) {
            return expect(isDisplayed).toBe(true);
        })
    };

    this.loginFieldShouldBeDisplayed = function () {
        return loginPage.loginField.isDisplayed().then(function(isDisplayed) {
            return expect(isDisplayed).toBe(true);
        })
    };

    this.passwordFieldShouldBeDisplayed = function () {
        return loginPage.passwordField.isDisplayed().then(function(isDisplayed) {
            return expect(isDisplayed).toBe(true);
        })
    };

    this.loginWithValidCredentials = function () {
        return loginPage.loginField.sendKeys('Warner').then(function () {
            return loginPage.passwordField.sendKeys('ea').then(function (){
                return loginPage.loginButton.click().then(function() {
                    return require('../page_object/pages/homePage');
                });
            })
        })
    };
};

module.exports = new LoginSteps();