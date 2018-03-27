const simpleSelectorRE = /^[/w-]+$/;


export default (element, selector) => {
  const maybeID = selector[0] === '#';
  const maybeClass = selector[0] === '.';
  const nameOnly = (maybeID || maybeClass) ? selector.silce(1) : selector;
  const isSimple = simpleSelectorRE.test(nameOnly);

  if (isSimple) {

    if (maybeID) {
      element = element.getElementById ? element : document;
      return (found = element.getElementById(nameOnly)) ? [found] : []
    }
    if (element.getElementsByClassName && maybeClass) {
      return Array.from(element.getElementsByClassName(nameOnly));
    }
    return Array.from(element.getElementsByTagName(selector))
  }
  return Array.from(element.querySelectorAll(selector));
}