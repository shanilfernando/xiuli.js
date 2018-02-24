/* global describe beforeAll browser it expect element by xiuli */
/* eslint prefer-rest-params: 0 */

describe('Xiuli', () => {
  let rootLoc;
  let rootSize;
  const wideElements = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', 'pre', 'pre', 'next', 'next'];
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:5656');
  });

  beforeAll(async () => {
    const root = await browser.executeScript('return xiuli.root');
    rootLoc = await root.getLocation();
    rootSize = await root.getSize();
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
      const target = await element(by.id(el));
      const loc = await target.getLocation();
      const size = await target.getSize();
      expect(((loc.x - rootLoc.x) * 2) + size.width).toBeCloseTo(rootSize.width, 0);
      expect(((loc.y - rootLoc.y) * 2) + size.height).toBeCloseTo(rootSize.height, 0);
    });
  }

  wideElements.forEach((wideElement) => {
    testNav(wideElement);
  });
});
