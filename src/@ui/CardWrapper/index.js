import React from 'react';
import { Platform, View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@ui/styled';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.node,
    style: PropTypes.any, // eslint-disable-line
  }),
);

const StyledCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
  borderRadius: theme.sizing.borderRadius,
  ...Platform.select({
    ios: {
      shadowColor: theme.colors.shadows.default,
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

const OverflowFix = styled(({ theme }) => ({
  flex: 1,
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
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
    <OverflowFix>
      {children}
    </OverflowFix>
  </StyledCard>
));

export default CardWrapper;
