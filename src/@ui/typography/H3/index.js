import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.8),
  fontFamily: theme.typography.fontFamilySansNeue.bold.default,
  color: theme.colors.text.primary,
  ...Platform.select({
    ios: {
      paddingTop: theme.helpers.rem(0.25),
      paddingBottom: theme.helpers.rem(0.15),
      lineHeight: theme.helpers.verticalRhythm(2.35, 1.25),
    },
    android: {
      lineHeight: theme.helpers.verticalRhythm(2.35, 1.4),
    },
    web: {
      lineHeight: theme.helpers.verticalRhythm(2.35, 1.25),
    },
  }),
}), 'H3');

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
