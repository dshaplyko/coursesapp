var loginSteps = require('../step_definitions/login');
var steps = require('../step_definitions/common');

describe('Accessing Login page', function() {

    beforeEach(function () {
        loginSteps.navigateTo()
    });

    it('Should contain all necessary items', function ()  {
        loginSteps.checkWelcomeText();
    });

    afterEach(function (){
        console.log('its done')
    });
});
