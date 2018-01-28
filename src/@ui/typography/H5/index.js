import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.112),
  fontFamily: theme.typography.fontFamilySansNeue.bold.default,
  lineHeight: theme.helpers.verticalRhythm(1.112, 1.145),
  color: theme.colors.text.primary,
}), 'H5');

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
