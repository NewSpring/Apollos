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

const StyledH4 = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.4),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(1.4, 1.117),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H4')(Text);

const H4 = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledH4
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledH4>
));

export default H4;
