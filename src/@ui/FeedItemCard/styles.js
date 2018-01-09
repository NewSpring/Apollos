import {
  View,
} from 'react-native';

import styled from '@ui/styled';
import { H4 } from '@ui/typography';

const CardWrapper = styled(({ theme }) => ({
  marginHorizontal: theme.sizing.baseUnit / 2,
  marginVertical: theme.sizing.baseUnit / 4,
}))(View);

const CardTitle = styled(({ theme, color: fontColor }) => ({
  width: '100%',
  color: fontColor || theme.colors.text.primary,
}))(H4);

const Footer = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit,
}))(View);

export {
  CardWrapper,
  CardTitle,
  Footer,
};
