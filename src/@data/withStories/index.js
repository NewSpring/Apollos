import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import identifyCategory from '@data/utils/identifyCategory';
import storiesQuery from './storiesQuery';

export default graphql(storiesQuery, {
  options: (ownProps = {}) => ({
    variables: {
      limit: ownProps.limit || 20,
      skip: ownProps.skip || 0,
    },
  }),
  props: ({ ownProps, data } = {}) => ({
    content: data.content && data.content.map(identifyCategory),
    isLoading: ownProps.isLoading || data.loading,
    refetch: data.refetch,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

