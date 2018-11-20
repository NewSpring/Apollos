import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(1.112),
    fontFamily: theme.typography.fontFamilySans.bold.default,
    color: theme.colors.text.primary,
    ...Platform.select({
      ios: {
        paddingTop: theme.helpers.rem(0.25),
        paddingBottom: theme.helpers.rem(0.175),
        lineHeight: theme.helpers.verticalRhythm(1.112, 1.13889),
      },
      android: {
        paddingTop: theme.helpers.rem(0.1),
        lineHeight: theme.helpers.verticalRhythm(1.112, 1.34),
      },
      web: {
        paddingTop: theme.helpers.rem(0.325),
        paddingBottom: theme.helpers.rem(0.1),
        lineHeight: theme.helpers.verticalRhythm(1.112, 1.13889),
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    }),
  }),
  'H5',
);

const H5 = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography, { width: '60%' }),
  pure,
)(Text);

export default H5;
