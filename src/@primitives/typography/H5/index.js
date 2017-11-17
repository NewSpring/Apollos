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

const StyledH5 = styled(({ theme }) => ({
  fontSize: rem(1.112, theme),
  lineHeight: verticalRhythm(1.112, 1.145, theme),
  fontWeight: '700',
  color: theme.baseFontColor,
}))(Text);

const H5 = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledH5
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledH5>
));

export default H5;
