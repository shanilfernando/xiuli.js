/* global describe beforeAll browser it expect element by xiuli document */

describe('Protractor Demo App', () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:3000');
    const wideElements = await element(by.js(() => {
      const spans = document.querySelectorAll('[xiuli-target]');
      return spans;
    }));
    Array.prototype.forEach.call(wideElements, async (element) => {
      const targetId = await element.getAttribute('xiuli-target');
      console.log(targetId);
    });
    
  });

  it('should have title Xiuli', async () => {
    expect(await browser.getTitle()).toBe('Xiuli');
  });

  it('should have title Xiuli', async () => {
    const nav = await element(by.id('button1'));
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

/*   function testNav(buttonId) {
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
  } */
});
