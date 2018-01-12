import { FlatList } from 'react-native';
import styled from '@ui/styled';

const RelatedContentList = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(FlatList);

export default RelatedContentList;
