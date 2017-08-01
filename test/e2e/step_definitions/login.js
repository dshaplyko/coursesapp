var loginPage = require('../page_object/pages/loginPage');
var homePage = require('../page_object/pages/homePage');

var LoginSteps = function () {

    this.navigateTo = () => {
        return browser.get(loginPage.url)
    };

    this.checkWelcomeText = () => {
        return loginPage.loginTitle.getText().then((text) => {
            return expect(text).toEqual('Sign in to Courses');  
        });
    };

    this.loginFormShouldBeDisplayed = () => {
        return loginPage.loginForm.isDisplayed().then((isDisplayed) => {
            return expect(isDisplayed).toBe(true);
        })
    };

    this.loginFieldShouldBeDisplayed = () => {
        return loginPage.loginField.isDisplayed().then((isDisplayed) => {
            return expect(isDisplayed).toBe(true);
        })
    };

    this.passwordFieldShouldBeDisplayed = () => {
        return loginPage.passwordField.isDisplayed().then((isDisplayed) => {
            return expect(isDisplayed).toBe(true);
        })
    };

    this.loginWithValidCredentials = () => {
        return loginPage.loginField.sendKeys('Warner')
            .then(() => {
                return loginPage.passwordField.sendKeys('ea');
            }).then(() => {
                return loginPage.loginButton.click();
            }).then(() => {
                return homePage;
            });
    }
};

module.exports = new LoginSteps();