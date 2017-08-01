var SpecReporter = require('jasmine-spec-reporter');
var Reporters = require('jasmine-reporters');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://appng.herokuapp.com/#/',
  globalTimeout: 300000,
  pageTimeout: 300000,
  allScriptsTimeout: 300000,
  
  specs: ['./test/e2e/specs/**/*'],

  onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter());
        jasmine.getEnv().addReporter(
          new Reporters.JUnitXmlReporter({
              savePath: './reports/'
          }));
        browser.manage().window().setSize(1200, 900);
        console.log('e2e started');
        
    }
};
