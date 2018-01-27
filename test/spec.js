/* global describe beforeAll browser it expect element by xiuli */

describe('Protractor Demo App', () => {
  const wideElements = ['button1', 'button2', 'button3', 'button4', 'button5', 'pre', 'pre', 'next', 'next'];
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:3000');
  });

  it('should have title Xiuli', async () => {
    expect(await browser.getTitle()).toBe('Xiuli');
  });

  function testNav(buttonId) {
    it(`Clicked ${buttonId}`, async () => {
      const nav = await element(by.id(buttonId));
      await nav.click();
      const el = await browser.executeAsyncScript(() => {
        const callback = arguments[arguments.length - 1];
        xiuli.onTransitionend(callback);
      });
      const { width, height } = await browser.executeScript('return {width:document.documentElement.clientWidth || document.body.clientWidth, height:document.documentElement.clientHeight || document.body.clientHeight}');
      const target = await element(by.id(el));
      const loc = await target.getLocation();
      const size = await target.getSize();
      expect((loc.x * 2) + size.width).toBeCloseTo(width, 0);
      expect((loc.y * 2) + size.height).toBeCloseTo(height, 0);
    });
  }

  wideElements.forEach((wideElement) => {
    testNav(wideElement);
  });
});
