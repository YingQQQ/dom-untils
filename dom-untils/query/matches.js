import canUseDOM from '../inDOM';
import qsa from './querySelectorAll';

let matchesCache;

// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
const otherSelector = (node, selector) => {
  let matches = qsa(node || node.ownerDocument, selector);
  let i = matches.length;
  while (--i > 0 && matches[i] !== node) {}

  return i > -1;
}

export default (node, selector) => {
  if (!matchesCache && node) {
    const body = document.body;
    const matchNative = body.matches
                      || body.matchesSelector
                      || body.mozMatchesSelector
                      || body.msMatchesSelector
                      || body.oMatchesSelector
                      || body.webkitMatchesSelector;
    matchesCache = matchNative ?
      (node, selector) => matchNative.call(node, selector): otherSelector;
  }
  return matchesCache ? matchesCache(node, selector) : null;
}