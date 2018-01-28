import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(0.875),
  fontFamily: theme.typography.fontFamilySansNeue.bold.default,
  lineHeight: theme.helpers.verticalRhythm(0.875, 1.02),
  color: theme.colors.text.primary,
}), 'H6');

const H6 = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography, { width: '50%' }),
  pure,
)(Text);

export default H6;
