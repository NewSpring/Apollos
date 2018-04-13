import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query topics {
    topics
  }
`;

export default graphql(QUERY, {
  props: ({ ownProps, data } = {}) => ({
    error: data.error || ownProps.error,
    topics: data.topics,
    isLoading: ownProps.isLoading || data.loading,
  }),
});
