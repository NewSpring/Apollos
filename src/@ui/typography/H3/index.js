import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(1.8),
    fontFamily: theme.typography.fontFamilySans.bold.default,
    color: theme.colors.text.primary,
    ...Platform.select({
      ios: {
        paddingTop: theme.helpers.rem(0.3),
        paddingBottom: theme.helpers.rem(0.15),
        lineHeight: theme.helpers.verticalRhythm(1.8, 1.14),
      },
      android: {
        lineHeight: theme.helpers.verticalRhythm(1.8, 1.34),
      },
      web: {
        paddingTop: theme.helpers.rem(0.3),
        paddingBottom: theme.helpers.rem(0.1),
        lineHeight: theme.helpers.verticalRhythm(1.8, 1.15),
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    }),
  }),
  'H3',
);

const H3 = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure,
)(Text);

export default H3;
