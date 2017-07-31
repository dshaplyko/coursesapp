var homeSteps = require('../step_definitions/home');
var steps = require('../step_definitions/common');
var loginSteps = require('../step_definitions/login');

describe('Accessing Home page', function() {

    beforeEach(function () {
        homeSteps.navigateTo();
    });

    it('Should contain body', function ()  {
        homeSteps.homePageShouldBeDisplayed();
    });

    it('Should navigate to login page', function ()  {
       steps.clickLogin();
       loginSteps.loginFormShouldBeDisplayed();
    });

    it('Should return empty search list', function ()  {
       homeSteps.executeSearch('blablabla');
       homeSteps.validateSearchMessage();
    });

    afterAll(function () {
       console.log('its done')
    });
});
