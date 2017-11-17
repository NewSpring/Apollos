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

const StyledH7 = styled(({ theme }) => ({
  fontSize: rem(0.778, theme),
  fontFamily: theme.fontFamilySans,
  lineHeight: verticalRhythm(0.778, 1.02, theme),
  color: theme.baseFontColor,
}))(Text);

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
