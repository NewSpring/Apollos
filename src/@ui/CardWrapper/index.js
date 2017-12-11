import React from 'react';
import { Platform, View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@ui/styled';

const enhance = compose(
  pure,
  setPropTypes({
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.any, // eslint-disable-line
  }),
);

const StyledCard = styled(({ theme, cardColor }) => ({
  width: '100%',
  backgroundColor: cardColor || theme.colors.lightPrimary,
  borderRadius: theme.sizing.borderRadius,
  ...Platform.select({
    ios: {
      shadowColor: theme.colors.lightTertiary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: `0 1px 4px ${theme.colors.lightTertiary}`,
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
  backgroundColor,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledCard
    cardColor={backgroundColor}
    style={styleProp}
    {...otherProps}
  >
    <OverflowFix>
      {children}
    </OverflowFix>
  </StyledCard>
));

export default CardWrapper;
