import FlatList from '@ui/FlatList';
import styled from '@ui/styled';

const FeedList = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
}))(FlatList);

export default FeedList;
