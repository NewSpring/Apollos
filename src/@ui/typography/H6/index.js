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

const StyledH6 = styled(({ theme }) => ({
  fontSize: theme.typography.rem(0.875),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.typography.verticalRhythm(0.875, 1.02),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H6')(Text);

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
