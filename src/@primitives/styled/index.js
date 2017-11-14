import { withProps } from 'recompose';

// HOC to make composing component style easy.
// Use similar to how you'd use `styled` in styled-components:
// StyledView = styled({ backgroundColor: 'red' })(View)
//
// Can base style off of props:
// StyledView = styled((props) => ({ backgroundColor: props.color }))(View)
//
// Or theme:
// StyledView = styled((props, theme) => ({ backgroundColor: theme.primaryColor }))(View)
//
// Also allows for style overriding:
// <StyledView style={{ borderColor: 'red' }} />
//
// Or using with ReactNative.StyleSheet:
// const styles = StyleSheet.create({ myStyle: { backgroundColor: 'red' }});
// StyledView = styled(styles.myStyle)(View)
//
// However - `styled` does use ReactNative.StyleSheet under the hood, so no need to create
// separate stylesheets.

// Merges two or more styles into one style object or array
const mergeStyles = (...stylesToMerge) => stylesToMerge.reduce((accumulatedStyle, currentStyle) => {
  let style = accumulatedStyle;
  if (!currentStyle && typeof currentStyle !== 'number') return accumulatedStyle;

  // Case One: both styles are objects, we should turn them into a single object:
  if (typeof style === 'object' && typeof currentStyle === 'object') {
    style = Object.assign({}, style, currentStyle);

  // Case two: accumulatedStyle is an array, but the last item is an object and we can merge
  } else if (typeof currentStyle === 'object' && Array.isArray(style) && style.length > 0 &&
      typeof style[style.length - 1] === 'object') {
    style[style.length - 1] = Object.assign({}, style[style.length - 1], currentStyle);

  // Case three: styles can't be merged automatically, result to joining them in an array
  } else {
    if (!Array.isArray(style)) {
      style = [style];
    }

    if (Array.isArray(currentStyle)) {
      style = style.concat(currentStyle);
    } else {
      style.push(currentStyle);
    }
  }

  return style;
});

const styled = styleInput => withProps((props) => {
  let style = styleInput;
  if (typeof styleInput === 'function') style = styleInput(props);

  // handle existing style prop
  if (props.style) style = mergeStyles(style, props.style);

  return { style };
});

export default styled;
