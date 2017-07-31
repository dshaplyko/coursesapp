var BasePage = require('./basePage');

function HomePage() {

    this.url = '/';
    this.body = element(by.css('body main'));
    this.searchField = element(by.css('.search-wrapper input'));
    this.searchButton = element(by.css('.search-wrapper button'));
    this.searchMessage = element(by.css('.course-list div'));
}

HomePage.prototype = BasePage;
module.exports = new HomePage();

