var homeSteps = require('../step_definitions/home');
var steps = require('../step_definitions/common');

describe('Accessing Home page', function() {

    beforeAll(function () {
        homeSteps.navigateTo();
    });

    it('Should contain body', function ()  {
        homeSteps.homePageShouldBeDisplayed();
    });

    it('Should navigate to login page', function ()  {
       steps.clickLogin();
       browser.sleep(5000);
    });

    afterAll(function (){
       console.log('its done')
    });
});
