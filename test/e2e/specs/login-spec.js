var loginSteps = require('../step_definitions/login');
var homeSteps = require('../step_definitions/home');

describe('Accessing Login page', function() {

    beforeEach(function () {
        loginSteps.navigateTo()
    });

    it('Should contain all necessary items', function ()  {
        loginSteps.checkWelcomeText();
        loginSteps.loginFieldShouldBeDisplayed();
        loginSteps.passwordFieldShouldBeDisplayed();
    });

    it('Should login using valid credentials', function ()  {
        loginSteps.loginWithValidCredentials();
        homeSteps.homePageShouldBeDisplayed();
    });


    afterEach(function (){
        console.log('its done')
    });
});
