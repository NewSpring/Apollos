import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import identifyCategory from '@data/utils/identifyCategory';
import newsStoriesQuery from './newsStoriesQuery';

export default graphql(newsStoriesQuery, {
  options: (ownProps = {}) => ({
    variables: {
      limit: ownProps.limit || 20,
      skip: ownProps.skip || 0,
    },
  }),
  props: ({ data } = {}) => ({
    content: data.content && data.content.map(identifyCategory),
    isLoading: data.loading,
    refetch: data.refetch,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

