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

const StyledH2 = styled(({ theme }) => ({
  fontSize: theme.typography.rem(2.35),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.typography.verticalRhythm(2.35, 1.145),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H2')(Text);

const H2 = enhance(({
  children,
  style: styleProp = {},
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
