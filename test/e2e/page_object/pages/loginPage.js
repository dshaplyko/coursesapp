var BasePage = require('./basePage');

function LoginPage() {

    this.url = '#/login';
    this.loginForm = element(by.css('div.login-form'));
    this.loginTitle = element(by.css('.login-form h1'));
    this.loginField = element(by.css('#login'));
    this.passwordField = element(by.css('#password'));
    this.loginButton = element(by.css('.dark'));
}

LoginPage.prototype = BasePage;
module.exports = new LoginPage();

