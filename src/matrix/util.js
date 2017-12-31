/* global getComputedStyle */

const ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;

/**
 * Get CSS transform.
 *
 * @param {HTMLElement} el HTML element
 * @returns {string} transform
 */
function getCSSStyles(el, ...properties) {
  const style = getComputedStyle(el, null);
  const result = {};
  properties.forEach((value) => {
    const property =
      style.getPropertyValue(`-webkit-${value}`) ||
      style.getPropertyValue(`-moz-${value}`) ||
      style.getPropertyValue(`-ms-${value}`) ||
      style.getPropertyValue(`-o-${value}`) ||
      style.getPropertyValue(`${value}`) ||
      'none';
    result[value] = property;
  });
  return result;
}

export { ARRAY_TYPE, getCSSStyles };
