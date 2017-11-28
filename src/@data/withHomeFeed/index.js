import { graphql } from 'react-apollo';
import { FOLLOWABLE_TOPICS } from '@data/constants';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import homeFeedQuery from './homeFeedQuery';

export default graphql(homeFeedQuery, {
  options: () => ({
    variables: {
      filters: ['CONTENT'],
      options: JSON.stringify({ content: { channels: FOLLOWABLE_TOPICS } }),
      limit: 20,
      skip: 0,
      cache: true,
    },
  }),
  props: ({ data }) => ({
    content: data.feed,
    isLoading: data.loading,
    refetch: data.refetch,
    fetchMore: fetchMoreResolver({
      collectionName: 'feed',
      data,
    }),
  }),
});

