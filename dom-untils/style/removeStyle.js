export default (node, key) => ('removeProperty' in node.style) ?
node.style.removeProperty(key):
  node.style.removeAttribute(key);