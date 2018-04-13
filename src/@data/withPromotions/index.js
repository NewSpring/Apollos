import { graphql } from 'react-apollo';
import identifyCategory from '@data/utils/identifyCategory';
import promotionsQuery from './promotionsQuery';

export default graphql(promotionsQuery, {
  options: () => ({
    variables: {
      setName: 'promotions_newspring',
    },
  }),
  props: ({ data } = {}) => ({
    error: data.error,
    content: data.content && data.content.map(identifyCategory),
    isLoading: data.loading,
    refetch: data.refetch,
  }),
});
