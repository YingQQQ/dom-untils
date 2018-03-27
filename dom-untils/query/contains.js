import canUseDOM from '../inDOM';

const isContains = (parent, node) => {
  if (node) {
    while ( (node = node.parentNode) ) {
      if (parent === node) {
        return true;
      }
    }
    return false;
  }
}


export default (parent, node) => {
  return canUseDOM ?
    (parent, node) => {
      if (parent.contains) {
       return parent.contains(node);
      } else if (parent.compareDocumentPosition) {
        // & 先转成十进制再比较
        return parent === node || !!(parent.compareDocumentPosition(node) & 16);
      } else {
        return isContains(parent, node);
      }
    } :
    isContains(parent, node);
}
