import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme, bold, italic }) => {
  let fontStack = theme.typography.fontFamilySerif.regular.default;
  let fontStyle = null;

  if (bold && italic) {
    fontStack = theme.typography.fontFamilySerif.bold.italic;
    fontStyle = 'italic';
  } else if (bold) {
    fontStack = theme.typography.fontFamilySerif.bold.default;
  } else if (italic) {
    fontStack = theme.typography.fontFamilySerif.regular.italic;
    fontStyle = 'italic';
  }

  return {
    fontSize: theme.helpers.rem(1.112),
    fontFamily: fontStack,
    color: theme.colors.text.primary,
    ...Platform.select({
      ios: {
        paddingTop: theme.helpers.rem(0.1),
        paddingBottom: theme.helpers.rem(0.125),
        lineHeight: theme.helpers.verticalRhythm(1.112, 1.4889),
      },
      android: {
        lineHeight: theme.helpers.verticalRhythm(1.112, 1.625),
      },
      web: {
        paddingTop: theme.helpers.rem(0.125),
        paddingBottom: theme.helpers.rem(0.1),
        lineHeight: theme.helpers.verticalRhythm(1.112, 1.4889),
        fontStyle: fontStyle, // eslint-disable-line
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    }),
  };
}, 'BodyText');

const BodyText = compose(
  setPropTypes({
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  defaultProps({
    bold: false,
    italic: false,
  }),
  styles,
  withPlaceholder(Typography),
  pure,
)(Text);

export default BodyText;
