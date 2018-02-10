import Xl from './xiuli';

export default function Xiuli(mainContainer) {
  const xiuli = new Xl(mainContainer);
  const {
    add, pre, next, onTransitionend, goto,
  } = xiuli;
  return {
    add, pre, next, onTransitionend, goto,
  };
}
