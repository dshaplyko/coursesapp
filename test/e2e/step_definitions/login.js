var loginPage = require('../page_object/pages/loginPage');
var homePage = require('../page_object/pages/homePage');

var LoginSteps = function () {

    this.navigateTo = () => {
        return browser.get(loginPage.url)
    };

    this.checkWelcomeText = () => {
        return loginPage.loginTitle.getText().then((text) => {
            return expect(text).toEqual('Sign in to Courses');  
        }, (error) => {
            console.error(error);
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

    this.enterUsername = () => {
        return loginPage.loginField.sendKeys('Warner');
    };

    this.enterPassword = () => {
        return loginPage.passwordField.sendKeys('ea');
    };

    this.clickSubmitButton = () => {
        return loginPage.loginButton.click();
    };

    this.errorMessageIsDisplayed = () => {
        return loginPage.loginForm.isDisplayed().then((isDisplayed) => {
            return expect(isDisplayed).toBe(true);
        })
    }

    this.loginWithValidCredentials = () => {
        return this.enterUsername()
            .then(() => {
                return this.enterPassword();
            }).then(() => {
                return this.clickSubmitButton();
            }).then(() => {
                return homePage;
        });
    }
};

module.exports = new LoginSteps();