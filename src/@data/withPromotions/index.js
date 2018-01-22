import { graphql } from 'react-apollo';
import promotionsQuery from './promotionsQuery';

export default graphql(promotionsQuery, {
  options: () => ({
    variables: {
      setName: 'promotions_newspring',
    },
  }),
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    refetch: data.refetch,
  }),
});
