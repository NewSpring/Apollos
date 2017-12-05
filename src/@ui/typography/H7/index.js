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

const StyledH7 = styled(({ theme }) => ({
  fontSize: theme.typography.rem(0.778),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.typography.verticalRhythm(0.778, 1.02),
  color: theme.palette.primary,
}), 'H7')(Text);

const H7 = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledH7
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledH7>
));

export default H7;
