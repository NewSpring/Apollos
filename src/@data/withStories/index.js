import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import storiesQuery from './storiesQuery';

export default graphql(storiesQuery, {
  options: (ownProps = {}) => ({
    variables: {
      limit: ownProps.limit || 20,
      skip: ownProps.skip || 0,
    },
  }),
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    refetch: data.refetch,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

