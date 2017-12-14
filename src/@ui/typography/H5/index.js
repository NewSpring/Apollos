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

const StyledH5 = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.112),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(1.112, 1.145),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H5')(Text);

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
