import { View } from 'react-native';
import styled from '@ui/styled';

const BackgroundView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.default,
}), 'BackgroundView')(View);

export default BackgroundView;
