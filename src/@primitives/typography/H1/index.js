import React from 'react';
import { Text } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
// import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';
import rem from '@utils/remUnit';
import verticalRhythm from '@utils/verticalRhythm';

const enhance = compose(
  pure,
  // withTheme(({ theme: { primaryColor } }) => ({ primaryColor })),
  setPropTypes({
    children: PropTypes.node,
    style: Text.propTypes.style,
  }),
);

const StyledH1 = styled(({ theme }) => ({
  color: theme.primaryColor,
  fontSize: rem(2.9),
  lineHeight: verticalRhythm(2.9, 0.945),
}))(Text);

const H1 = enhance(({
  children,
  style: styleProp = {},
  primaryColor,
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
