import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(0.778),
  fontFamily: theme.typography.fontFamilySansNeue.regular.default,
  lineHeight: theme.helpers.verticalRhythm(0.778, 1.02),
  color: theme.colors.text.primary,
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
