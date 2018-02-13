/* global document */
/* eslint no-param-reassign: ["error", {"ignorePropertyModificationsFor": ["out"]}] */

import { Mat4, Vec3, getCSSStyles } from './matrix';

export default class Xiuli {
  constructor(mainContainer = 'xiuli') {
    this.elementIds = [];
    const xiulies = document.querySelectorAll('[xiuli-target]');
    this.current = -1;
    this.main = document.getElementById(mainContainer);
    this.main.style.position = 'absolute';
    this.main.style.transformStyle = 'preserve-3d';
    const { 'transition-duration': transitionDuration } = getCSSStyles(this.main, 'transition', 'transition-duration');
    if (transitionDuration === '0s') {
      this.main.style.transitionDuration = '2s';
      this.main.style.WebkitTransitionDuration = '2s';
    }
    this.root = this.main.parentElement;
    const { left, top } = this.root.getBoundingClientRect();
    this.root.x = left;
    this.root.y = top;
    this.callback = null;
    this.data = null;
    this.main.addEventListener(
      'transitionend',
      () => {
        if (this.callback) {
          this.callback(this.elementIds[this.current], this.data);
          this.data = null;
        }
      },
      false,
    );
    this.mainTrans = Mat4.fromElement(this.main);
    this.elements = {};
    Array.prototype.forEach.call(xiulies, (el, i, els) => {
      /* let secTr = Mat4.create(); */
      const { transform } = getCSSStyles(el, 'transform', 'transform-origin');
      let secTr = Mat4.fromCSSTransform(transform);
      secTr = Xiuli.spiralRotate(secTr, i, els);
      el.style.transform = Mat4.toCssTransform(secTr);
    });
    Array.prototype.forEach.call(xiulies, (el) => {
      this.add(el, false);
    });
  }

  static spiral(secTr, i, els) {
    const thita = (6.28319 * (i)) / els.length;
    secTr[12] = 500 * Math.sin(thita);
    secTr[13] = 500;
    secTr[14] = 200 * (Math.cos(thita) - 1);
    return secTr;
  }

  static spiralRotate(secTr, i, els) {
    const thita = (6.28319 * (i)) / els.length;
    Mat4.rotate(secTr, thita, Vec3.fromValues(0, 1, 0), secTr);
    secTr[12] = 600 * Math.sin(thita);
    secTr[13] = 200 * i;
    secTr[14] = 600 * (Math.cos(thita) - 1);
    return secTr;
  }

  add(el, move) {
    const { transform, 'transform-origin': transformOrigin } = getCSSStyles(el, 'transform', 'transform-origin');
    const re = /[-+]?[0-9]*\.?[0-9]+/g;
    const [x = 0.0, y = 0.0, z = 0.0] = transformOrigin.match(re);
    const secTr = Mat4.fromCSSTransform(transform);
    const TrVec = Vec3.fromValues(x, y, z);
    const TrMat = Mat4.fromTranslation(TrVec);
    Mat4.multiply(TrMat, secTr, secTr);
    Vec3.negate(TrVec, TrVec);
    const w = document.documentElement.clientWidth
      || document.body.clientWidth;
    const h = document.documentElement.clientHeight
      || document.body.clientHeight;
    TrVec[0] -= ((w - el.offsetWidth) / 2) - this.root.x;
    TrVec[1] -= ((h - el.offsetHeight) / 2) - this.root.y;
    Mat4.fromTranslation(TrVec, TrMat);
    Mat4.multiply(secTr, TrMat, secTr);

    Mat4.invert(secTr, secTr);
    Mat4.multiply(this.mainTrans, secTr, secTr);

    this.elements[el.id] = Mat4.toCssTransform(secTr);
    this.elementIds.push(el.id);
    if (move) {
      this.main.style.transform = this.elements[el.id];
      this.clicked = el;
    }
  }
  onTransitionend(fn) {
    this.callback = fn;
  }
  goto(tId, data) {
    const i = this.elementIds.indexOf(tId);
    if (i !== -1) {
      this.main.style.transform = this.elements[tId];
      this.data = data;
      this.current = i;
    }
  }

  pre(data) {
    this.current -= 1;
    if (this.current < 0) {
      this.current = this.elementIds.length - 1;
    }
    const tId = this.elementIds[this.current];
    this.goto(tId, data);
  }

  next(data) {
    this.current += 1;
    if (this.current >= this.elementIds.length) {
      this.current = 0;
    }
    const tId = this.elementIds[this.current];
    this.goto(tId, data);
  }
}
