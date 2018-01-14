/* global describe beforeAll browser it expect element by xiuli document */

describe('Protractor Demo App', () => {
  let wideElements = ['button1', 'button2', 'button3', 'button4', 'button5'];
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
      const { width, height } = await browser.executeScript('return {width:window.innerWidth, height:window.innerHeight}');
      const targetId = await el.getAttribute('xiuli-target');
      const target = await element(by.id(targetId));
      const loc = await target.getLocation();
      expect((loc.x * 2) + loc.width).toBeCloseTo(width, 0);
      expect((loc.y * 2) + loc.height).toBeCloseTo(height, 0);
    });
  }

  for (const wideElement of wideElements) {
    testNav(wideElement);
  }
});
