import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import identifyCategory from '@data/utils/identifyCategory';
import homeFeedQuery from './homeFeedQuery';

export default graphql(homeFeedQuery, {
  options: () => ({
    variables: {
      filters: ['CONTENT'],
      limit: 20,
      skip: 0,
      cache: true,
    },
  }),
  props: ({ data, ownProps }) => ({
    // NOTE: if we need to transform feed with more than one identity function
    // we should use the transducer pattern instead
    content: data.feed && data.feed.map(identifyCategory),
    isLoading: ownProps.isLoading || data.loading,
    refetch: data.refetch,
    fetchMore: fetchMoreResolver({
      collectionName: 'feed',
      data,
    }),
  }),
});
