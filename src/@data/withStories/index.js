import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import storiesQuery from './storiesQuery';

export default graphql(storiesQuery, {
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

