/* global document window */

import { Mat4, Vec3, getCSSStyles } from './matrix';

export default class Xiuli {
  constructor(mainContainer = 'xiuli') {
    const buttons = document.querySelectorAll('[xiuli-target]');
    this.main = document.getElementById(mainContainer);
    this.root = this.main.parentElement;
    /* this.main.addEventListener(
      'transitionend',
      (event) => {
        console.log(event);
      },
      false,
    ); */
    this.mainTrans = Mat4.fromElement(this.main);

    this.elements = {};
    Array.prototype.forEach.call(buttons, this.init.bind(this));
  }

  init(element, index) {
    const targetId = element.getAttribute('xiuli-target');
    const target = document.getElementById(targetId);
    const { transform, 'transform-origin': transformOrigin } = getCSSStyles(target, 'transform', 'transform-origin');
    const re = /[-+]?[0-9]*\.?[0-9]+/g;
    const [x = 0.0, y = 0.0, z = 0.0] = transformOrigin.match(re);

    const secTr = Mat4.fromCSSTransform(transform);
    const TrVec = Vec3.fromValues(x, y, z);
    const TrMat = Mat4.fromTranslation(TrVec);
    Mat4.multiply(TrMat, secTr, secTr);
    Vec3.negate(TrVec, TrVec);
    TrVec[0] -= (this.root.offsetWidth - target.offsetWidth) / 2;
    TrVec[1] -= (window.innerHeight - target.offsetHeight) / 2;
    Mat4.fromTranslation(TrVec, TrMat);

    Mat4.multiply(secTr, TrMat, secTr);

    Mat4.invert(secTr, secTr);
    Mat4.multiply(this.mainTrans, secTr, secTr);

    this.elements[targetId] = Mat4.toCssTransform(secTr);
    if (index === 0) {
      this.main.style.transform = this.elements[targetId];
    }
    element.addEventListener('click', this.onMenuClick.bind(this));
  }

  onMenuClick({
    target,
  }) {
    const targetId = target.getAttribute('xiuli-target');
    this.main.style.transform = this.elements[targetId];
  }

  on(eventName, callback) {
    this.main.addEventListener(
      eventName,
      (event) => {
        callback(event);
      },
      false,
    );
  }
}
