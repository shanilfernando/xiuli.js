describe('Protractor Demo App', function () {
    beforeAll(function () {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000');
    });

    it('should have title Xiuli', function () {
        expect(browser.getTitle()).toBe('Xiuli');
    });
});