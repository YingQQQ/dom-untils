import matches from './closest';

// 判断是不是文档节点
const isDoc = obj => obj != null && obj.nodeType === obj.DOCUMENT_NODE;


// 返回最近的祖先元素
export default (node, selector, context) => {
  while (node && (isDoc(node) || !matches(node, selector))) {
    node = node !== context && !isDoc(node) ? node.parentNode : null;
  }
  return node;
}