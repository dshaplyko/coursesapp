const homeSteps = require('../step_definitions/home');
const steps = require('../step_definitions/common');
const loginSteps = require('../step_definitions/login');

describe('Accessing Home page', () => {

    beforeEach(() => {
        homeSteps.navigateTo();
    });

    it('Should contain body', () =>  {
        homeSteps.homePageShouldBeDisplayed();
    });

    it('Should navigate to login page', () =>  {
       steps.clickLogin();
       loginSteps.loginFormShouldBeDisplayed();
    });

    it('Should return empty search list', () =>  {
       homeSteps.executeSearch('blablabla');
       homeSteps.validateSearchMessage();
    });
    
});
