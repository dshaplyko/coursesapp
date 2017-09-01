const loginSteps = require('../step_definitions/login');
const homeSteps = require('../step_definitions/home');
const steps = require('../step_definitions/common');



describe('Accessing Login page', function() {

    beforeEach(function () {
        loginSteps.navigateTo()
    });

    it('Should contain all necessary items', function ()  {
        loginSteps.checkWelcomeText();
        steps.highlightLoginButton();
        loginSteps.loginFieldShouldBeDisplayed();
        loginSteps.passwordFieldShouldBeDisplayed();
    });

    it('Should login using valid credentials', function ()  {
        loginSteps.loginWithValidCredentials();
        homeSteps.homePageShouldBeDisplayed();
    });
});
