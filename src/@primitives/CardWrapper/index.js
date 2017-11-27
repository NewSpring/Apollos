import React from 'react';
import { Platform, View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@primitives/styled';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.node,
    style: View.propTypes.style,
  }),
);

const StyledCard = styled(({ theme }) => ({
  backgroundColor: theme.lightPrimaryColor,
  borderRadius: theme.cardBorderRadius,
  ...Platform.select({
    ios: {
      shadowColor: theme.lightTertiaryColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    android: {
      elevation: 1,
    },
  }),
}))(View);

const CardWrapper = enhance(({
  children,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledCard
    style={styleProp}
    {...otherProps}
  >
    {children}
  </StyledCard>
));

export default CardWrapper;
