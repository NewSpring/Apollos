import { View } from 'react-native';

import styled from '@ui/styled';

const Content = styled(({ theme }) => ({
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.sizing.baseUnit,
}))(View);

export default Content;
