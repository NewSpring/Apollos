import { flattenDeep } from 'lodash';

// Merges two or more styles into one style object or array
const mergeStyles = (...stylesToMerge) => flattenDeep(stylesToMerge).reduce((
  accumulatedStyle, currentStyle,
) => {
  let style = accumulatedStyle;
  const styleRight = currentStyle;

  if (!styleRight && typeof styleRight !== 'number') return accumulatedStyle;

  // both styles are objects, we should turn them into a single object:
  if (typeof style === 'object' && !Array.isArray(style) &&
      !Array.isArray(styleRight) && typeof styleRight === 'object') {
    style = Object.assign({}, style, styleRight);

  // styles can't be merged automatically, result to joining them in an array
  } else {
    if (!Array.isArray(style)) {
      style = [style];
    }

    if (Array.isArray(styleRight)) {
      style = style.concat(styleRight);
    } else {
      style.push(styleRight);
    }
  }
  return style;
});

export default mergeStyles;
