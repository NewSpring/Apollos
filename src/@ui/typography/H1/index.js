import { Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(2.9),
    fontFamily: theme.typography.fontFamilySans.bold.default,
    color: theme.colors.text.primary,
    ...Platform.select({
      ios: {
        paddingTop: theme.helpers.rem(0.65),
        lineHeight: theme.helpers.verticalRhythm(2.9, 0.945),
      },
      android: {
        lineHeight: theme.helpers.verticalRhythm(2.9, 1.15),
      },
      web: {
        paddingTop: theme.helpers.rem(0.45),
        paddingBottom: theme.helpers.rem(0.175),
        lineHeight: theme.helpers.verticalRhythm(2.9, 0.975),
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    }),
  }),
  'H1',
);

const H1 = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure,
)(Text);

export default H1;
