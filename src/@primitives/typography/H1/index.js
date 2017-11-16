import React from 'react';
import { Text, Platform } from 'react-native';
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

const StyledH1 = styled(({ theme }) => ({
  fontSize: rem(2.9),
  fontWeight: '700',
  color: theme.primaryColor,
  ...Platform.select({
    ios: {
      lineHeight: verticalRhythm(2.9, 0.945),
    },
    web: {
      lineHeight: verticalRhythm(2.9, 0.945),
    },
    android: {
      lineHeight: verticalRhythm(2.9, 1.025),
    },
  }),
}))(Text);

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
