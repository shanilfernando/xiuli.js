import Xl from './xiuli';

function Xiuli(selector) {
  const xiuli = new Xl(selector);
  return {
    goto: xiuli.goto.bind(xiuli),
    pre: xiuli.pre.bind(xiuli),
    next: xiuli.next.bind(xiuli),
    onTransitionend: xiuli.onTransitionend.bind(xiuli),
  };
}
module.exports = Xiuli;
