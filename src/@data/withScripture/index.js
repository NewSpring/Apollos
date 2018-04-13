import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const scriptureQuery = gql`
  query getScripture($query: String!){
    scripture(query: $query) {
      html
    }
  }
`;

export default graphql(scriptureQuery, {
  options: (ownProps = {}) => ({
    variables: {
      query: ownProps.query,
    },
  }),
  props: ({ ownProps, data } = {}) => ({
    error: data.error,
    content: data.scripture,
    isLoading: ownProps.isLoading || data.loading,
  }),
});

