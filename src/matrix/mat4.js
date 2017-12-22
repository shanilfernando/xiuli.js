/* eslint no-param-reassign: ["error", { "out": false }] */

import { ARRAY_TYPE } from './util';

/**
 * 4 x 4 Matrix
 */
export default class Mat4 {
  /**
   * Creates a new 4 x 4 identity Matrix.
   * @return {Mat4} a new 4 x 4 identity Matrix.
   */
  static create() {
    const out = new ARRAY_TYPE(16);
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
   * Creates a new 4 x 4 Matrix from CSS transform.
   *
   * @param {string} transform CSS transform
   * @returns {Mat4} out
   */
  static fromCSSTransform(transform) {
    const re = /\(|\)|\, |\s/g;
    const values = transform.split(re);

    const matrix = this.create();
    if (values[0] === 'matrix') {
      matrix[0] = parseFloat(values[1]);
      matrix[1] = parseFloat(values[2]);
      matrix[4] = parseFloat(values[3]);
      matrix[5] = parseFloat(values[4]);
      matrix[12] = parseFloat(values[5]);
      matrix[13] = parseFloat(values[6]);
    } else if (values[0] === 'matrix3d') {
      this.copy(matrix, values.slice(1, 17).map(v => parseFloat(v)));
    }
    return matrix;
  }

  /**
   * Copy the values from source Mat4 to out Mat4
   *
   * @param {Mat4} out the receiving matrix
   * @param {Mat4} source the source matrix
   * @returns {Mat4} out
   */
  static copy(out, source) {
    for (let i = 0, l = source.length; i < l; i += 1) {
      out[i] = source[i];
    }
    return out;
  }
}
