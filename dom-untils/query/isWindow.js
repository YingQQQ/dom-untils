export default node => node === node.window ? node : (node.nodeType === 9 ? node.defaultView || node.parentWindow :false);