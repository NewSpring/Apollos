import React from 'react';
import { View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@primitives/styled';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.node,
    style: View.propTypes.style,
  }),
);

// const StyledCard = styled(({ theme }) => ({
const StyledCard = styled(() => ({
  height: 400,
  width: '92%',
  borderWidth: 1,
  borderRadius: 6,
}))(View);

const Card = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledCard
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledCard>
));

export default Card;
