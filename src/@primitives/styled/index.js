import { StyleSheet } from 'react-native';
import { withPropsOnChange, compose, mapProps } from 'recompose';
import { isEqual, flatten } from 'lodash';
import withTheme from '@primitives/withTheme';

// HOC to make composing component style easy.
// Use similar to how you'd use `styled` in styled-components:
// StyledView = styled({ backgroundColor: 'red' })(View)
//
// Can base style off of props:
// StyledView = styled((props) => ({ backgroundColor: props.color }))(View)
//
// Or theme:
// StyledView = styled(({ theme, ...ownProps }) => ({ backgroundColor: theme.primaryColor }))(View)
//
// Also allows for style overriding:
// <StyledView style={{ borderColor: 'red' }} />
//
// Or using with ReactNative.StyleSheet:
// const styles = StyleSheet.create({ myStyle: { backgroundColor: 'red' }});
// StyledView = styled(styles.myStyle)(View)
//
// However - `styled` uses ReactNative.StyleSheet under the hood, so no need to create
// separate stylesheets:
// StyledView = styled((props) => ({ backgroundColor: props.color }))(View)
// Will create a stylesheet for { backgroundColor: props.color } internally and cache it!

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

const cachedStyles = {};
const styleHasher = JSON.stringify; // todo: how bad is this?

// Uses cached or generates a new StyleSheet for a given style prop
const generateStyleSheetForStylesProp = (stylesToGenerate) => {
  let styles = flatten([stylesToGenerate]);
  const styleSheet = {}; // passed to StyleSheet.create later

  // Load style from cache or add style to stylesheet
  styles.forEach((style, index) => {
    if (typeof style !== 'object' || !style) return;
    const hash = styleHasher(style);
    if (cachedStyles[hash]) {
      styles[index] = cachedStyles[hash];
    } else {
      styleSheet[`${index}`] = style;
    }
  });

  // Generate the new stylesheet
  const generatedStyleSheet = StyleSheet.create(styleSheet);

  // Process the generated stylesheet
  Object.keys(generatedStyleSheet).forEach((key) => {
    const index = parseInt(key, 0);
    const generatedStyle = generatedStyleSheet[key];
    const hash = styleHasher(styles[index]);

    // add generated style to cache
    cachedStyles[hash] = generatedStyle;

    // swap generated style into result list
    styles[index] = generatedStyle;
  });

  if (styles.length === 1) [styles] = styles;
  return styles;
};

// Generates a style object from a given styleInput.
// styleInput is the argument passed to `styled`
const getStyleLiteralFromInput = (styleInput, { ownProps = {}, theme = {} }) => {
  let generatedStyle = styleInput;
  if (typeof generatedStyle === 'function') generatedStyle = generatedStyle({ theme, ...ownProps });
  return generatedStyle;
};

const styled = styleInput => compose(
  mapProps(props => ({ ownProps: props })),
  withTheme(({ theme }) => ({ theme })),
  withPropsOnChange(
    // Only re-eval styles if style prop changes, or the generated style from
    // styleInput is different. Both of these checks should be exteremely cheap.
    (props, nextProps) => props.ownProps.style !== nextProps.ownProps.style || !isEqual(
      getStyleLiteralFromInput(styleInput, props), getStyleLiteralFromInput(styleInput, nextProps),
    ),
    ({ ownProps, theme }) => {
      let style = getStyleLiteralFromInput(styleInput, { ownProps, theme });
      if (ownProps.style) style = mergeStyles(style, ownProps.style);

      style = generateStyleSheetForStylesProp(style);

      return { style };
    },
  ),
  mapProps(({ ownProps, style }) => ({ ...ownProps, style })),
);

export default styled;
