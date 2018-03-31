const rHyphen = /-(.)/g;
const msPattern = /^-ms-/;
const rUpper = /([A-Z])/g

// margin-left ==> marginLeft
const camelize = (string) => typeof string === 'string' && string.replace(rHyphen, (_, str) => str.toUpperCase());


export const camelizeStyle = (string) => camelize(string.replace(msPattern, 'ms-'));

export const hyphenateStyle = (string) => string.replace(rUpper, '-$1').toLowerCase();
