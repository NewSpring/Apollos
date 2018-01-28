import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.4),
  fontFamily: theme.typography.fontFamilySansNeue.bold.default,
  lineHeight: theme.helpers.verticalRhythm(1.4, 1.117),
  color: theme.colors.text.primary,
}), 'H4');

const H4 = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography, { width: '80%' }),
  pure,
)(Text);

export default H4;
