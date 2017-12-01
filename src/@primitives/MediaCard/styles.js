import {
  View,
  Platform,
} from 'react-native';

import styled from '@primitives/styled';
import { H4 } from '@primitives/typography';

const CardWrapper = styled(({ theme }) => ({
  marginHorizontal: theme.baseUnit / 2,
  marginVertical: theme.baseUnit / 4,
}))(View);

const Card = styled(({ theme, cardColor }) => ({
  width: '100%',
  minHeight: 400,
  maxWidth: 420,
  backgroundColor: !cardColor ? theme.lightPrimaryColor : cardColor,
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
      elevation: 3,
    },
  }),
}))(View);

/*
 * Overflow on iOS, when declared on the same element as a shadow, clips the shadow so it must live
 * on a child wrapper. https://github.com/facebook/react-native/issues/449
 */
const OverflowFix = styled(({ theme }) => ({
  flex: 1,
  borderRadius: theme.cardBorderRadius,
  overflow: 'hidden',
}))(View);

const CardTitle = styled(({ theme, color: fontColor }) => ({
  flex: 0,
  paddingTop: theme.baseUnit,
  paddingHorizontal: theme.baseUnit,
  color: fontColor,
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
