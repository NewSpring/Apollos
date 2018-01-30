import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.112),
  fontFamily: theme.typography.fontFamilySerif.regular.default,
  color: theme.colors.text.primary,
  ...Platform.select({
    ios: {
      paddingTop: theme.helpers.rem(0.1),
      paddingBottom: theme.helpers.rem(0.125),
      lineHeight: theme.helpers.verticalRhythm(1.112, 1.4889),
    },
    android: {
      lineHeight: theme.helpers.verticalRhythm(1.112, 1.625),
    },
    web: {
      paddingTop: theme.helpers.rem(0.125),
      paddingBottom: theme.helpers.rem(0.1),
      lineHeight: theme.helpers.verticalRhythm(1.112, 1.4889),
    },
  }),
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
