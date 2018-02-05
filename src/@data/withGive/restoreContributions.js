import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// NOTE: We're passing in the entire state as a JSON string
// and allowing the resolver to parse it
// because Apollo Client has not resolved how to add client side type definitions
export const MUTATION = gql`
  mutation restoreContributions($state: String) {
    restoreContributions(state: $state) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    restoreContributions: state => (mutate({ variables: { state } })),
  }),
});
