/* global document */

export default class Xiuli {
  constructor() {
    const menuItems = document.getElementById('menu').children;
    this.main = document.getElementById('main');
    this.main.addEventListener(
      'transitionend',
      (event) => {
        console.log(event);
      },
      false,
    );
    this.mainTrans = this.getTransformation(this.main);
    this.elements = {};
    Array.prototype.forEach.call(menuItems, this.init.bind(this));
  }

  test() {
    this.console.log('Test');
  }
}
