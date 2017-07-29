var homeSteps = require('../step_definitions/home')

describe('Accessing Home page', function() {

  describe('When visiting Home Page', function () {

    it('Should contain body', function ()  {
        homeSteps.navigateTo();
        homeSteps.homePageShouldBeDisplayed();
    });
  });
});
