import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1),
  lineHeight: theme.helpers.verticalRhythm(1, 1),
  fontFamily: theme.typography.fontFamilySerif,
  color: theme.colors.text.primary,
}), 'BodyCopy');

const BodyCopy = compose(
  setPropTypes({
    isLoading: PropTypes.bool, // display loading placeholder
    ...Text.propTypes,
  }),
  styles,
  withPlaceholder(Typography),
  pure,
)(Text);

export default BodyCopy;
