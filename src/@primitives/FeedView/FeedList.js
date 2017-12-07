import { FlatList } from 'react-native';
import styled from '@primitives/styled';

const FeedList = styled(({ theme }) => ({
  paddingVertical: theme.baseUnit / 4,
}))(FlatList);

export default FeedList;
