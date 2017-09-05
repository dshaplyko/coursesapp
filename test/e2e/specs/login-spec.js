const loginSteps = require('../step_definitions/login');
const homeSteps = require('../step_definitions/home');
const steps = require('../step_definitions/common');

describe('Accessing Login page', () => {

    beforeEach(() => {
        loginSteps.navigateTo()
    });

    it('Should contain all necessary items', () => {
        loginSteps.checkWelcomeText();
        loginSteps.loginFieldShouldBeDisplayed();
        loginSteps.passwordFieldShouldBeDisplayed();
    });

    it('Should login using valid credentials', () => {
        loginSteps.loginWithValidCredentials();
        homeSteps.homePageShouldBeDisplayed();
    });

    // it('Should error on a missing username' () => {
    //     loginSteps.enterPassword();
    //     loginSteps.clickSubmitButton();
    //     loginSteps.errorMessageIsDisplayed();
    // })
});
