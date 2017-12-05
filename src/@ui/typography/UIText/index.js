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

const StyledUIText = styled(({ theme }) => ({
  fontSize: theme.typography.rem(1),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.typography.verticalRhythm(1, 1),
  color: theme.palette.text.primary,
}), 'UIText')(Text);

const UIText = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledUIText
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledUIText>
));

export default UIText;
