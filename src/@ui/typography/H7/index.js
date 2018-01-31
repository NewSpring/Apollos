import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(0.778),
  fontFamily: theme.typography.fontFamilySans.regular.default,
  color: theme.colors.text.primary,
  ...Platform.select({
    ios: {
      paddingTop: theme.helpers.rem(0.075),
      paddingBottom: theme.helpers.rem(0.125),
      lineHeight: theme.helpers.verticalRhythm(0.778, 1.014),
    },
    android: {
      lineHeight: theme.helpers.verticalRhythm(0.778, 1.214),
    },
    web: {
      paddingTop: theme.helpers.rem(0.125),
      paddingBottom: theme.helpers.rem(0.05),
      lineHeight: theme.helpers.verticalRhythm(0.778, 1.05),
    },
  }),
}), 'H7');

const H7 = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography, { width: '40%' }),
  pure,
)(Text);

export default H7;
