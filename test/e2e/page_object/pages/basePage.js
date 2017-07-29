var Header = require('../common/header');

var BasePage = function () {

    this.header = Header;

    this.scrollToTheBottom = function () {
         return browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    }

    this.scrollToTheTop = function () {
         return browser.executeScript('window.scrollTo(0, 0)');
    }

    this.wait = function () {
        return browser.sleep(5000);
    }
};

module.exports = new BasePage();