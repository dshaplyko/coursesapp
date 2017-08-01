var header = require('../page_object/common/header');
var loginPage = require('../page_object/pages/loginPage');

var CommonSteps = function () {

    this.clickLogin = () => {
        return header.loginButton.click()
            .then(() => {
                return loginPage;
            })
    };
};

module.exports = new CommonSteps();