// 获得当前元素相对于document的位置。返回一个对象含有： top, left, width和height
import contains from './contains'
import isWindow from './isWindow'
import ownerDocument from '../ownerDocument'

export default (node) => {
  const doc = ownerDocument(node);
  const win = isWindow(doc);
  const docElem = doc.documentElement;
  let box = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  if (!doc) {
    return;
  }

  if (!contains(docElem, node)) {
    return;
  }

  if (node.getBoundingClientRect) {
    box = node.getBoundingClientRect();
  }

  // 兼容 ie 8
  box = {
    top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
    left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
    width: box.width || node.offsetWidth || 0,
    height: box.height || node.offsetHeight || 0
  }

  return box;
}