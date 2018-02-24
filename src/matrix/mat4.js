/* eslint no-param-reassign: ["error", {"ignorePropertyModificationsFor": ["out"]}] */
/* eslint one-var-declaration-per-line: ["off"] */
/* eslint one-var: ["off"] */
/* eslint prefer-const: ["off"] */
/* eslint no-mixed-operators: ["off"] */
/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
/* eslint-env es6 */
/* eslint no-useless-escape: "error" */

import { ARRAY_TYPE, getCSSStyles } from './util';

/**
 * Creates a new 4 x 4 identity Matrix.
 * @return {Mat4} a new 4 x 4 identity Matrix.
 */
export function create() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

/**
* Copy the values from one mat4 to another
*
* @param {mat4} a the source matrix
* @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
* @returns {mat4} out
*/
export function copy(a, out = new ARRAY_TYPE(16)) {
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
export function fromTranslation(v, out = create()) {
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
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
export function multiply(a, b, out = new ARRAY_TYPE(16)) {
  const a00 = a[0],
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
  let b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];

  out[0] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[1] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[2] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[3] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);

  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[5] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[6] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[7] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);

  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[9] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[10] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[11] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);

  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[13] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[14] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[15] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);
  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} a the source matrix
 * @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
 * @returns {mat4} out
 */
export function invert(a, out = new ARRAY_TYPE(16)) {
  const a00 = a[0],
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

    b00 = (a00 * a11) - (a01 * a10),
    b01 = (a00 * a12) - (a02 * a10),
    b02 = (a00 * a13) - (a03 * a10),
    b03 = (a01 * a12) - (a02 * a11),
    b04 = (a01 * a13) - (a03 * a11),
    b05 = (a02 * a13) - (a03 * a12),
    b06 = (a20 * a31) - (a21 * a30),
    b07 = (a20 * a32) - (a22 * a30),
    b08 = (a20 * a33) - (a23 * a30),
    b09 = (a21 * a32) - (a22 * a31),
    b10 = (a21 * a33) - (a23 * a31),
    b11 = (a22 * a33) - (a23 * a32);

  // Calculate the determinant
  let det =
    (b00 * b11) - (b01 * b10) + (b02 * b09) + (b03 * b08) - (b04 * b07) + (b05 * b06);

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = ((a11 * b11) - (a12 * b10) + (a13 * b09)) * det;
  out[1] = ((a02 * b10) - (a01 * b11) - (a03 * b09)) * det;
  out[2] = ((a31 * b05) - (a32 * b04) + (a33 * b03)) * det;
  out[3] = ((a22 * b04) - (a21 * b05) - (a23 * b03)) * det;
  out[4] = ((a12 * b08) - (a10 * b11) - (a13 * b07)) * det;
  out[5] = ((a00 * b11) - (a02 * b08) + (a03 * b07)) * det;
  out[6] = ((a32 * b02) - (a30 * b05) - (a33 * b01)) * det;
  out[7] = ((a20 * b05) - (a22 * b02) + (a23 * b01)) * det;
  out[8] = ((a10 * b10) - (a11 * b08) + (a13 * b06)) * det;
  out[9] = ((a01 * b08) - (a00 * b10) - (a03 * b06)) * det;
  out[10] = ((a30 * b04) - (a31 * b02) + (a33 * b00)) * det;
  out[11] = ((a21 * b02) - (a20 * b04) - (a23 * b00)) * det;
  out[12] = ((a11 * b07) - (a10 * b09) - (a12 * b06)) * det;
  out[13] = ((a00 * b09) - (a01 * b07) + (a02 * b06)) * det;
  out[14] = ((a31 * b01) - (a30 * b03) - (a32 * b00)) * det;
  out[15] = ((a20 * b03) - (a21 * b01) + (a22 * b00)) * det;

  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
export function rotate(a, rad, axis, out = new ARRAY_TYPE(16)) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;

  if (Math.abs(len) < 0.000001) { return null; }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
  a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
  a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
  b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
  b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) { // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Creates a new 4 x 4 Matrix from CSS transform.
 *
 * @param {string} transform CSS transform
 * @returns {Mat4} out
 */
export function fromCSSTransform(transform) {
  const re = /\(|\)|, |\s/g,
    values = transform.split(re),
    matrix = create();

  if (values[0] === 'matrix') {
    matrix[0] = parseFloat(values[1]);
    matrix[1] = parseFloat(values[2]);
    matrix[4] = parseFloat(values[3]);
    matrix[5] = parseFloat(values[4]);
    matrix[12] = parseFloat(values[5]);
    matrix[13] = parseFloat(values[6]);
  } else if (values[0] === 'matrix3d') {
    copy(values.slice(1, 17).map(v => parseFloat(v)), matrix);
  }
  return matrix;
}

/**
 * Creates a new 4 x 4 Matrix from CSS transform.
 *
 * @param {HTMLElement} el CSS transform
 * @returns {Mat4} out
 */
export function fromElement(el) {
  const { transform } = getCSSStyles(el, 'transform'),
    matrix = fromCSSTransform(transform);
  return matrix;
}

/**
 * Convert Mat4 to CSS transform.
 *
 * @param {Mat4} transform 4 x 4 Matrix
 * @returns {string} CSS transform
 */
export function toCssTransform(transform) {
  return `matrix3d(${transform.join(',')})`;
}
