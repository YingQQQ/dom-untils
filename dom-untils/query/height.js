// 获取元素的高度
import isWin from './isWindow';

export default (node , element) => {
  const win = isWin(node);
  return win ? win.innerHeight:
          element ? element.clientHeight: offset(node).height;
}