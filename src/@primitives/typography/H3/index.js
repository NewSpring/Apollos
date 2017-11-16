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

const StyledH3 = styled(({ theme }) => ({
  fontSize: rem(1.8),
  lineHeight: verticalRhythm(1.8, 1.145),
  fontWeight: '700',
  color: theme.baseFontColor,
}))(Text);

const H3 = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledH3
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledH3>
));

export default H3;
