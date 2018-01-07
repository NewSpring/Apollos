import PlaceholderLine from 'rn-placeholder/src/line/line';
import PlaceholderParagraph from 'rn-placeholder/src/paragraph/paragraph';
import PlaceholderMedia from 'rn-placeholder/src/media/media';

import RNPlaceholder from 'rn-placeholder';
import { StyleSheet } from 'react-native';
import { compose, defaultProps, mapProps, pure } from 'recompose';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';

export { default as withPlaceholder } from './withPlaceholder';

const placeholderEnhance = compose(
  RNPlaceholder.connect,
  withTheme(({ theme, color, radius }) => ({
    radius: radius || theme.sizing.borderRadius,
    color: color || theme.colors.background.inactive,
  })),
);

export const Typography = compose(
  placeholderEnhance,
  pure,
  mapProps(({ style, ...otherProps }) => ({
    flattenedStyles: StyleSheet.flatten(style),
    ...otherProps,
  })),
  styled(({ flattenedStyles: { fontSize, lineHeight } = {} }) => {
    const styles = { };
    if (fontSize && lineHeight) {
      styles.height = fontSize;
      styles.marginVertical = (lineHeight - fontSize) / 2;
    }
    return styles;
  }, 'Placeholder.Typography'),
)(PlaceholderLine);

export const Line = placeholderEnhance(PlaceholderLine);

export const Paragraph = compose(
  placeholderEnhance,
  pure,
  styled(({ theme }) => ({
    height: theme.helpers.rem(1),
    marginVertical: (theme.helpers.rem(1) - theme.helpers.verticalRhythm(1, 0.5)) / 2,
  }), 'Placeholder.Paragraph'),
  mapProps(({ style, ...other }) => ({ lineStyle: style, ...other })),
  defaultProps({
    lineSpacing: 0, width: '100%', firstLineWidth: '75%', lastLineWidth: '85%', lineNumber: 3,
  }),
)(PlaceholderParagraph);

export const Media = placeholderEnhance(PlaceholderMedia);

export default {
  Line,
  Paragraph,
  Media,
  Typography,
};
