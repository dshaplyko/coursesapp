var SpecReporter = require('jasmine-spec-reporter');
var Reporters = require('jasmine-reporters');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var log4reporter = require('./reporter.js');

var reporter = new HtmlScreenshotReporter({
  dest: './screenshots',
  filename: 'my-report.html',
  captureOnlyFailedSpecs: true
});

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://appng.herokuapp.com/#/',
  globalTimeout: 300000,
  pageTimeout: 300000,
  allScriptsTimeout: 300000,
  
  specs: ['./test/e2e/specs/**/*'],

  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function () {
        jasmine.getEnv().addReporter(new log4reporter());
        jasmine.getEnv().addReporter(new SpecReporter());
        jasmine.getEnv().addReporter(reporter);
        jasmine.getEnv().addReporter(new Reporters.JUnitXmlReporter({
              savePath: './reports/'
        }));

        browser.manage().window().setSize(1200, 900);
        console.log('e2e started'); 
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
          reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};
