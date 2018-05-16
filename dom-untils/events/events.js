import canUseDOM from '../inDOM';
import contains from '../query/contains';
import qsa from '../query/querySelectorAll'

let on = () => { };

if (canUseDOM) {
  on = (() => {
    if (document.addEventListener) {
      return (node, eventName, handler, capture = false) => {
        node.addEventListener(eventName, handler, capture);
      }
    } else if (document.attachEvent) {
      return(node, eventName, handler) => {
        node.atachEvent(`on${eventName}`, (e = window.e) => {
          e.target = e.target || e.srcElement;
          e.currentTarget = node;
          handler.call(node, e);
        })
      }
    }
  })();
}

let off = () => { };

if (canUseDOM) {
  off = (() => {
    if (document.removeEventListener) {
      return (node, eventName, handler, capture = false) => {
        node.removeEventListener(eventName, handler, capture);
      }
    } else if (document.detachEvent) {
      return (node, eventName, handler) => {
        node.detachEvent(`on${eventName}`, handler);
      }
    }
  })();
}

let listen = () => { };

if (canUseDOM) {
  listen = ((node, eventName, handler, capture = false) => {
    on(node, eventName, handler, capture);
    return () => {
      off(node, eventName, handler, capture);
    }
  })();
}

function filter(selector, handler) {
  return function filterHandler(e) {
    const top = e.currentTarget;
    const target = e.target;
    const matches = qsa(top, selector);

    const isMatches = matches.some(match => contains(match, target));
    if (isMatches) {
      handler.call(this, e)
    }
  }
}


export default {
  on,
  off,
  listen,
  filter
};

