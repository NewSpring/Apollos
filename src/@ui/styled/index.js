import { withPropsOnChange, compose, mapProps } from 'recompose';
import { isEqual, get } from 'lodash';
import { withTheme } from '@ui/theme';

import mergeStyles from './mergeStyles';
import createStyleSheet from './createStyleSheet';

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

// Generates a style object from a given styleInput.
// styleInput is the argument passed to `styled`
const getStyleLiteralFromStyledInput = (styleInput, { ownProps = {}, theme = {} }) => {
  let generatedStyle = styleInput;
  if (typeof generatedStyle === 'function') generatedStyle = generatedStyle({ theme, ...ownProps });
  return generatedStyle;
};

const styled = (styleInput, fqn) => compose(
  mapProps(props => ({ ownProps: props })),
  withTheme(({ theme }) => ({ theme })),
  withPropsOnChange(
    // Only re-eval styles if style prop changes, or the generated style from
    // styleInput is different. Both of these checks should be exteremely cheap.
    (props, nextProps) => props.ownProps.style !== nextProps.ownProps.style || !isEqual(
      getStyleLiteralFromStyledInput(styleInput, props),
      getStyleLiteralFromStyledInput(styleInput, nextProps),
    ),
    ({ ownProps, theme }) => {
      let style = getStyleLiteralFromStyledInput(styleInput, { ownProps, theme });

      const themeOverrides = fqn ? get(theme, `overrides['${fqn}']`, {}) : {};
      const { style: ownPropsStyle = {} } = ownProps;

      style = mergeStyles(style, themeOverrides, ownPropsStyle);
      style = createStyleSheet(style);

      return { style };
    },
  ),
  mapProps(({ ownProps, style }) => ({ ...ownProps, style })),
);

export default styled;
