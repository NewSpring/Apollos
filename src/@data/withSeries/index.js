import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import seriesQuery from './seriesQuery';

export default graphql(seriesQuery, {
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

