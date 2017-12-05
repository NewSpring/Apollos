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

const StyledH2 = styled(({ theme }) => ({
  fontSize: rem(2.35, theme),
  fontFamily: theme.fontFamilySans,
  lineHeight: verticalRhythm(2.35, 1.145, theme),
  fontWeight: '700',
  color: theme.baseFontColor,
}))(Text);

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
