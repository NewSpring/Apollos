import React from 'react';
import { Text } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@primitives/styled';
import rem from '@utils/remUnit';
import verticalRhythm from '@utils/verticalRhythm';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.node,
    style: Text.propTypes.style,
  }),
);

const StyledH6 = styled(({ theme }) => ({
  color: theme.baseFontColor,
  fontSize: rem(0.875),
  lineHeight: verticalRhythm(0.875, 1.02),
}))(Text);

const H6 = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledH6
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledH6>
));

export default H6;
