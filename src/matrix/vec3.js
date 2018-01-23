/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["out"]}] */
/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
import { ARRAY_TYPE } from './util';

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
export function fromValues(x, y, z) {
  const out = new ARRAY_TYPE(3);
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
export function copy(a, out = new ARRAY_TYPE(3)) {
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
export function negate(a, out = new ARRAY_TYPE(3)) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
