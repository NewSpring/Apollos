import {
  View,
  Platform,
} from 'react-native';

import styled from '@ui/styled';
import { H4 } from '@ui/typography';

const CardWrapper = styled(({ theme }) => ({
  marginHorizontal: theme.sizing.baseUnit / 2,
  marginVertical: theme.sizing.baseUnit / 4,
}))(View);

const Card = styled(({ theme, cardColor }) => ({
  width: '100%',
  minHeight: 400,
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

/*
 * Overflow on iOS, when declared on the same element as a shadow, clips the shadow so overflow must
 * live on a child wrapper. https://github.com/facebook/react-native/issues/449
 */
const OverflowFix = styled(({ theme }) => ({
  flex: 1,
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
}))(View);

const CardTitle = styled(({ theme, color: fontColor }) => ({
  flex: 0,
  paddingTop: theme.sizing.baseUnit,
  paddingHorizontal: theme.sizing.baseUnit,
  color: fontColor || theme.colors.text.primary,
}))(H4);

const Footer = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

export {
  CardWrapper,
  Card,
  OverflowFix,
  CardTitle,
  Footer,
};
