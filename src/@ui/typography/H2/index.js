import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(2.35),
  fontFamily: theme.typography.fontFamilySansNeue.bold.default,
  color: theme.colors.text.primary,
  ...Platform.select({
    ios: {
      paddingTop: theme.helpers.rem(0.35),
      paddingBottom: theme.helpers.rem(0.2),
      lineHeight: theme.helpers.verticalRhythm(2.35, 1.25),
    },
    android: {
      lineHeight: theme.helpers.verticalRhythm(2.35, 1.45),
    },
    web: {
      paddingTop: theme.helpers.rem(0.4),
      paddingBottom: theme.helpers.rem(0.2),
      lineHeight: theme.helpers.verticalRhythm(2.35, 1.275),
    },
  }),
}), 'H2');

const H2 = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure,
)(Text);

export default H2;
