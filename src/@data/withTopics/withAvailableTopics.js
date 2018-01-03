import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query topics {
    topics
  }
`;

export default graphql(QUERY, {
  props: ({ data } = {}) => ({
    topics: data.topics,
    isLoading: data.loading,
  }),
});
