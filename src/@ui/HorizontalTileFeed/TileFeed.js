import { FlatList } from 'react-native';
import styled from '@ui/styled';

const TileFeed = styled(({ theme, getHeight }) => ({
  height: getHeight,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(FlatList);

export default TileFeed;
