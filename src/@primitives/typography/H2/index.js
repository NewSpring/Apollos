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

const StyledH2 = styled(({ theme }) => ({
  color: theme.baseFontColor,
  fontSize: rem(2.35),
  lineHeight: verticalRhythm(2.35, 1.145),
}))(Text);

const H2 = enhance(({
  children,
  style: styleProp = {},
  baseFontColor,
  ...otherProps
}) => (
  <StyledH2
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledH2>
));

export default H2;
