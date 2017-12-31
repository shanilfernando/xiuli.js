/* global */
import Xiuli from './xiuli';

/* (function initMiuli() {
  function init() {
    if (document.getElementById('xiuli')) {
      const xiuli = new Xiuli();
      module.exports = xiuli;
    }
  }
  if (
    document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
}()); */

const xiuli = new Xiuli();
module.exports = xiuli;
