import { Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(2.9),
  fontFamily: theme.typography.fontFamilySansNeue.bold.default,
  color: theme.colors.primary,
  ...Platform.select({
    ios: {
      paddingTop: theme.helpers.rem(0.25),
      lineHeight: theme.helpers.verticalRhythm(2.9, 0.945),
    },
    web: {
      lineHeight: theme.helpers.verticalRhythm(2.9, 0.945),
    },
    android: {
      lineHeight: theme.helpers.verticalRhythm(2.9, 1.025),
    },
  }),
}), 'H1');

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
