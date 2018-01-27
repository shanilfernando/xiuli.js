/* global document */
/* eslint no-underscore-dangle: ["error", { "allow": ["_current", "_bar"] }] */

import { Mat4, Vec3, getCSSStyles } from './matrix';

export default class Xiuli {
  constructor(mainContainer = 'xiuli') {
    this.elementIds = [];
    const xiulies = document.querySelectorAll('[xiuli-target]');
    let _current = -1;
    this.next = (clicked) => {
      _current += 1;
      if (_current >= this.elementIds.length) {
        _current = 0;
      }
      const tId = this.elementIds[_current];
      this.target = tId;
      this.clicked = clicked;
      this.main.style.transform = this.elements[tId];
    };
    this.pre = (clicked) => {
      _current -= 1;
      if (_current < 0) {
        _current = this.elementIds.length - 1;
      }
      const tId = this.elementIds[_current];
      this.target = tId;
      this.clicked = clicked;
      this.main.style.transform = this.elements[tId];
    };
    this.main = document.getElementById(mainContainer);
    this.root = this.main.parentElement;
    const { left, top } = this.root.getBoundingClientRect();
    this.root.x = left;
    this.root.y = top;
    this.callback = null;
    this.clicked = null;
    this.target = null;
    this.main.addEventListener(
      'transitionend',
      () => {
        if (this.callback) {
          this.callback(this.target, this.clicked);
          this.clicked = null;
          this.target = null;
        }
      },
      false,
    );
    this.mainTrans = Mat4.fromElement(this.main);

    this.elements = {};

    Array.prototype.forEach.call(xiulies, (el) => {
      this.add(el, false);
    });
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
  goto(tId, clicked) {
    this.main.style.transform = this.elements[tId];
    this.clicked = clicked;
    this.target = tId;
  }
}
