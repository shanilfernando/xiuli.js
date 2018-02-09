(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("xiuli", [], factory);
	else if(typeof exports === 'object')
		exports["xiuli"] = factory();
	else
		root["xiuli"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global getComputedStyle */

var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;

/**
 * Get CSS transform.
 *
 * @param {HTMLElement} el HTML element
 * @returns {string} transform
 */
function getCSSStyles(el) {
  var style = getComputedStyle(el, null);
  var result = {};

  for (var _len = arguments.length, properties = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    properties[_key - 1] = arguments[_key];
  }

  properties.forEach(function (value) {
    var property = style.getPropertyValue('-webkit-' + value) || style.getPropertyValue('-moz-' + value) || style.getPropertyValue('-ms-' + value) || style.getPropertyValue('-o-' + value) || style.getPropertyValue('' + value) || 'none';
    result[value] = property;
  });
  return result;
}

exports.ARRAY_TYPE = ARRAY_TYPE;
exports.getCSSStyles = getCSSStyles;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _xiuli = __webpack_require__(2);

var _xiuli2 = _interopRequireDefault(_xiuli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xiuli = new _xiuli2.default(); /* global */

module.exports = xiuli;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global document */

var _matrix = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Xiuli = function () {
  function Xiuli() {
    var _this = this;

    var mainContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xiuli';

    _classCallCheck(this, Xiuli);

    this.elementIds = [];
    var xiulies = document.querySelectorAll('[xiuli-target]');
    this.current = -1;
    this.main = document.getElementById(mainContainer);
    this.main.style.position = 'absolute';
    this.main.style.transformStyle = 'preserve-3d';

    var _getCSSStyles = (0, _matrix.getCSSStyles)(this.main, 'transition', 'transition-duration'),
        transitionDuration = _getCSSStyles['transition-duration'];

    if (transitionDuration === '0s') {
      this.main.style.transitionDuration = '2s';
      this.main.style.WebkitTransitionDuration = '2s';
    }
    this.root = this.main.parentElement;

    var _root$getBoundingClie = this.root.getBoundingClientRect(),
        left = _root$getBoundingClie.left,
        top = _root$getBoundingClie.top;

    this.root.x = left;
    this.root.y = top;
    this.callback = null;
    this.data = null;
    this.main.addEventListener('transitionend', function () {
      if (_this.callback) {
        _this.callback(_this.elementIds[_this.current], _this.data);
        _this.data = null;
      }
    }, false);
    this.mainTrans = _matrix.Mat4.fromElement(this.main);
    this.elements = {};
    Array.prototype.forEach.call(xiulies, function (el) {
      _this.add(el, false);
    });
  }

  _createClass(Xiuli, [{
    key: 'add',
    value: function add(el, move) {
      var _getCSSStyles2 = (0, _matrix.getCSSStyles)(el, 'transform', 'transform-origin'),
          transform = _getCSSStyles2.transform,
          transformOrigin = _getCSSStyles2['transform-origin'];

      var re = /[-+]?[0-9]*\.?[0-9]+/g;

      var _transformOrigin$matc = transformOrigin.match(re),
          _transformOrigin$matc2 = _slicedToArray(_transformOrigin$matc, 3),
          _transformOrigin$matc3 = _transformOrigin$matc2[0],
          x = _transformOrigin$matc3 === undefined ? 0.0 : _transformOrigin$matc3,
          _transformOrigin$matc4 = _transformOrigin$matc2[1],
          y = _transformOrigin$matc4 === undefined ? 0.0 : _transformOrigin$matc4,
          _transformOrigin$matc5 = _transformOrigin$matc2[2],
          z = _transformOrigin$matc5 === undefined ? 0.0 : _transformOrigin$matc5;

      var secTr = _matrix.Mat4.fromCSSTransform(transform);
      var TrVec = _matrix.Vec3.fromValues(x, y, z);
      var TrMat = _matrix.Mat4.fromTranslation(TrVec);
      _matrix.Mat4.multiply(TrMat, secTr, secTr);
      _matrix.Vec3.negate(TrVec, TrVec);
      var w = document.documentElement.clientWidth || document.body.clientWidth;
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      TrVec[0] -= (w - el.offsetWidth) / 2 - this.root.x;
      TrVec[1] -= (h - el.offsetHeight) / 2 - this.root.y;
      _matrix.Mat4.fromTranslation(TrVec, TrMat);
      _matrix.Mat4.multiply(secTr, TrMat, secTr);

      _matrix.Mat4.invert(secTr, secTr);
      _matrix.Mat4.multiply(this.mainTrans, secTr, secTr);

      this.elements[el.id] = _matrix.Mat4.toCssTransform(secTr);
      this.elementIds.push(el.id);
      if (move) {
        this.main.style.transform = this.elements[el.id];
        this.clicked = el;
      }
<<<<<<< HEAD
      el.addEventListener('click', this.onMenuClick.bind(this));
    }
  }, {
    key: 'onMenuClick',
    value: function onMenuClick(_ref) {
      var target = _ref.target;

      var targetId = target.getAttribute('xiuli-target');
      this.main.style.transform = this.elements[targetId];
      this.clicked = target;
=======
>>>>>>> c90a83d8e2d8c2ead332a34db961cf540f0de815
    }
  }, {
    key: 'onTransitionend',
    value: function onTransitionend(fn) {
      this.callback = fn;
    }
  }, {
    key: 'goto',
    value: function goto(tId, data) {
      var i = this.elementIds.indexOf(tId);
      if (i !== -1) {
        this.main.style.transform = this.elements[tId];
        this.data = data;
        this.current = i;
      }
    }
  }, {
    key: 'pre',
    value: function pre(data) {
      this.current -= 1;
      if (this.current < 0) {
        this.current = this.elementIds.length - 1;
      }
      var tId = this.elementIds[this.current];
      this.goto(tId, data);
    }
  }, {
    key: 'next',
    value: function next(data) {
      this.current += 1;
      if (this.current >= this.elementIds.length) {
        this.current = 0;
      }
      var tId = this.elementIds[this.current];
      this.goto(tId, data);
    }
  }]);

  return Xiuli;
}();

exports.default = Xiuli;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mat4 = exports.Vec3 = exports.getCSSStyles = exports.ARRAY_TYPE = undefined;

var _util = __webpack_require__(0);

var _vec = __webpack_require__(4);

var Vec3 = _interopRequireWildcard(_vec);

var _mat = __webpack_require__(5);

var Mat4 = _interopRequireWildcard(_mat);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.ARRAY_TYPE = _util.ARRAY_TYPE;
exports.getCSSStyles = _util.getCSSStyles;
exports.Vec3 = Vec3;
exports.Mat4 = Mat4;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromValues = fromValues;
exports.copy = copy;
exports.negate = negate;

var _util = __webpack_require__(0);

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  var out = new _util.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
* Copy the values from one vec3 to another
*
* @param {vec3} a the source vector
* @param {vec3} [out = new ARRAY_TYPE(3)] the receiving vector
* @returns {vec3} out
*/
/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["out"]}] */
/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
function copy(a) {
  var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _util.ARRAY_TYPE(3);

  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} a vector to negate
 * @param {vec3} [out = new ARRAY_TYPE(3)] the receiving vector
 * @returns {vec3} out
 */
function negate(a) {
  var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _util.ARRAY_TYPE(3);

  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.copy = copy;
exports.fromTranslation = fromTranslation;
exports.multiply = multiply;
exports.invert = invert;
exports.fromCSSTransform = fromCSSTransform;
exports.fromElement = fromElement;
exports.toCssTransform = toCssTransform;

var _util = __webpack_require__(0);

/**
 * Creates a new 4 x 4 identity Matrix.
 * @return {Mat4} a new 4 x 4 identity Matrix.
 */
function create() {
  var out = new _util.ARRAY_TYPE(16);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
* Copy the values from one mat4 to another
*
* @param {mat4} a the source matrix
* @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
* @returns {mat4} out
*/
/* eslint no-param-reassign: ["error", {"ignorePropertyModificationsFor": ["out"]}] */
/* eslint one-var-declaration-per-line: ["error", "always"] */
/* eslint one-var: ["error", "always"] */
/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
/* eslint no-mixed-operators: ["error", {"allowSamePrecedence": true}] */
/* eslint-env es6 */
/* eslint no-useless-escape: "error" */

function copy(a) {
  var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _util.ARRAY_TYPE(16);

  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Creates a matrix from a vector translation
 *
 * @param {vec3} v Translation vector
 * @param {mat4} [out = new ARRAY_TYPE(16)] out mat4 receiving operation result
 * @returns {mat4} out
 */
function fromTranslation(v) {
  var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _util.ARRAY_TYPE(16);

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
 * @returns {mat4} out
 */
function multiply(a, b) {
  var out = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _util.ARRAY_TYPE(16);

  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3],
      a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7],
      a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11],
      a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  // Cache only the current line of the second matrix
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];

  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} a the source matrix
 * @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
 * @returns {mat4} out
 */
function invert(a) {
  var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _util.ARRAY_TYPE(16);

  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3],
      a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7],
      a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11],
      a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15],
      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}

/**
 * Creates a new 4 x 4 Matrix from CSS transform.
 *
 * @param {string} transform CSS transform
 * @returns {Mat4} out
 */
function fromCSSTransform(transform) {
  var re = /\(|\)|, |\s/g,
      values = transform.split(re),
      matrix = this.create();

  if (values[0] === 'matrix') {
    matrix[0] = parseFloat(values[1]);
    matrix[1] = parseFloat(values[2]);
    matrix[4] = parseFloat(values[3]);
    matrix[5] = parseFloat(values[4]);
    matrix[12] = parseFloat(values[5]);
    matrix[13] = parseFloat(values[6]);
  } else if (values[0] === 'matrix3d') {
    this.copy(values.slice(1, 17).map(function (v) {
      return parseFloat(v);
    }), matrix);
  }
  return matrix;
}

/**
 * Creates a new 4 x 4 Matrix from CSS transform.
 *
 * @param {HTMLElement} el CSS transform
 * @returns {Mat4} out
 */
function fromElement(el) {
  var _getCSSStyles = (0, _util.getCSSStyles)(el, 'transform'),
      transform = _getCSSStyles.transform,
      matrix = this.fromCSSTransform(transform);

  return matrix;
}

/**
 * Convert Mat4 to CSS transform.
 *
 * @param {Mat4} transform 4 x 4 Matrix
 * @returns {string} CSS transform
 */
function toCssTransform(transform) {
  return 'matrix3d(' + transform.join(',') + ')';
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=xiuli.js.map