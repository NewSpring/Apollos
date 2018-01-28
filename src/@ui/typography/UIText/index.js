import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1),
  fontFamily: theme.typography.fontFamilySansNeue.regular.default,
  color: theme.colors.text.primary,
  ...Platform.select({
    ios: {
      paddingTop: theme.helpers.rem(0.15),
      lineHeight: theme.helpers.verticalRhythm(1, 1),
    },
    android: {
      lineHeight: theme.helpers.verticalRhythm(1, 1.2),
    },
    web: {
      lineHeight: theme.helpers.verticalRhythm(1, 1),
    },
  }),
}), 'UIText');

const UIText = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography),
  pure,
)(Text);

export default UIText;
