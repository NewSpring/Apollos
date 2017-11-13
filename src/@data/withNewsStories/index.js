import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import newsStoriesQuery from './newsStoriesQuery';

export default graphql(newsStoriesQuery, {
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

