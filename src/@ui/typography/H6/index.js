import React from 'react';
import { Text } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@ui/styled';
import rem from '@utils/remUnit';
import verticalRhythm from '@utils/verticalRhythm';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.node,
    style: Text.propTypes.style,
  }),
);

const StyledH6 = styled(({ theme }) => ({
  fontSize: rem(0.875, theme),
  fontFamily: theme.fontFamilySans,
  lineHeight: verticalRhythm(0.875, 1.02, theme),
  fontWeight: '700',
  color: theme.baseFontColor,
}))(Text);

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
