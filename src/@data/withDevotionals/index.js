import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import devotionalsQuery from './devotionalsQuery';

export default graphql(devotionalsQuery, {
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

