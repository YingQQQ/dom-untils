// 获取元素的宽度
import isWin from './isWindow';

export default (node, element) => {
  const win = isWin(node);
  return win ? win.innerWidth :
    element ? element.clientWidth : offset(node).width;
}