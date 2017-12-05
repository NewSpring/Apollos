import React from 'react';
import { Text, Platform } from 'react-native';
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

const StyledH1 = styled(({ theme }) => ({
  fontSize: theme.typography.rem(2.9),
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamilySans,
  color: theme.palette.primary,
  ...Platform.select({
    ios: {
      lineHeight: theme.typography.verticalRhythm(2.9, 0.945),
    },
    web: {
      lineHeight: theme.typography.verticalRhythm(2.9, 0.945),
    },
    android: {
      lineHeight: theme.typography.verticalRhythm(2.9, 1.025),
    },
  }),
}), 'H1')(Text);

const H1 = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledH1
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledH1>
));

export default H1;
