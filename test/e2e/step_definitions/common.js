var header = require('../page_object/common/header');
var loginPage = require('../page_object/pages/loginPage');

var CommonSteps = function () {

    this.clickLogin = () => {
        return header.loginButton.click()
            .then(() => {
                return loginPage;
            })
    };

    //Maybe this would be useful for element highlighting

    // this.highlightLoginButton = () => {
    //     var styleOpt = "color: Red; border: 2px solid red;";
    //     return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", (loginPage.loginButton).getWebElement(), styleOpt)
    //       .then(function () {
    //         return browser.wait(function () {
    //           return (loginPage.loginButton).getCssValue('border').then(function (border) {
    //             console.log(border.toString());
    //             return border.toString().indexOf('2px solid rgb(255,') > -1;
    //           })
    //         }, 5000, 'Style is not applied');
    //       }, function (err) {
    //         console.log("error is :" + err);
    //       });
    //   };
};

module.exports = new CommonSteps();