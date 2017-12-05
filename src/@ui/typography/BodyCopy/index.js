import React from 'react';
import { Text } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@ui/styled';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.node,
    style: Text.propTypes.style,
  }),
);

const StyledBodyCopy = styled(({ theme }) => ({
  fontSize: theme.typography.rem(1),
  lineHeight: theme.typography.rem(1, 1),
  fontFamily: theme.typography.fontFamilySerif,
  color: theme.palette.text.primary,
}), 'BodyCopy')(Text);

const BodyCopy = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledBodyCopy
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledBodyCopy>
));

export default BodyCopy;
