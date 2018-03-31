import {
  camelizeStyle
} from '../utils/camelize';

const rposition = /^(top|bottom|right|left)$/;
const rnumnonpx = /^([+-]?(?:\d*\.|)d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

export default (node) => {
  if (!node) {
    throw new Error('No Element passed');
  }
  const doc = node.ownerDocument;

  return 'defaultView' in doc ?
    (doc.defaultView.opener ?
      doc.defaultView.getComputedStyle(node, null) :
      window.getComputedStyle(node, null)) :
    (prop) => {
      let style = node.style;
      prop = camelizeStyle(prop);
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      let current = node.currentStyle[prop] || null;
      if (currentStyle === null && style && style[prop]) {
        current = style[props];
      }
      // 如果是1rem
      if (rnumnonpx.test(current) && !rposition.test(current)) {
        current = prop === 'fontSize' ? '1em' : current;
      }

      return current;
    }
}