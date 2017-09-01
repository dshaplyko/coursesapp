var log4js = require('log4js');

log4js.configure({
    appenders: {
      cheese: {type: 'file', filename: 'cheese.log'},
      console: {type: 'console'}
    },
    categories: {default: {appenders: ['cheese', 'console'], level: 'info'}}
  });
  
  const logger = log4js.getLogger();

var Reporter = function(options) {
    
    this.suiteStarted = function(suite) {
    };
  
    this.suiteDone = function(suite) {
    };
  
    this.specStarted = function(spec) {
    };
  
    this.specDone = function(result) {
        if (result.status === 'failed') {
            logger.fatal(result.failedExpectations[0].message);
        }
    };
  
    this.jasmineDone = function() {    
    };
  
}
  
  module.exports = Reporter;