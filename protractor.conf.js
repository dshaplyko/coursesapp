var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //baseUrl: 'http://appng.herokuapp.com/',
  globalTimeout: 300000,
  pageTimeout: 300000,
  allScriptsTimeout: 300000,
  
  specs: ['./test/e2e/specs/**/*'],

  onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter());
        browser.manage().window().setSize(1200, 900);
        console.log('e2e started');
    }
};
