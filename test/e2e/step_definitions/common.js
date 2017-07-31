var header = require('../page_object/common/header');

var CommonSteps = function () {

    this.clickLogin = function () {
        return header.loginButton.click()
            .then(function () {
                return require('../page_object/pages/loginPage');
            })
    }
};

module.exports = new CommonSteps();