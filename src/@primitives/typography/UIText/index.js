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

const StyledUIText = styled(({ theme }) => ({
  fontSize: rem(1),
  lineHeight: verticalRhythm(1, 1),
  color: theme.baseFontColor,
}))(Text);

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
