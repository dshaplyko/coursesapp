var BasePage = require('./basePage');

function HomePage() {

    this.url = 'http://appng.herokuapp.com/#/';
    this.body = element(by.css('body main'));
    this.searchField = element(by.css("input[name='search']"));
    this.searchButton = element(by.css('.search-wrapper button'));

}

HomePage.prototype = BasePage;
module.exports = new HomePage();

