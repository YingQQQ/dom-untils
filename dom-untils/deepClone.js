// 简版的deepclone

const isObject = (option) => !!option && typeof option === 'object';
const hasOwnProperty = Object.hasOwnProperty;
export default function extend(src = {}, option) {
  if (!isObject(option)) {
    throw new Error('pleasce check types of your passed');
    return;
  }
  for (const key in option) {
    if (hasOwnProperty.call(option, key)) {
      const srcTarget = src[key];
      const copyTarget = option[key];

      if (srcTarget === copyTarget) {
        continue;
      }
      if (copyTarget && isObject(copyTarget)) {
        extend(srcTarget, copyTarget);
      } else if (copyTarget !== undefined) {
        src[key] = copyTarget;
      }

    }
  }
  return src;
}