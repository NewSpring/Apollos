import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation addContribution($id: String, $amount: Number, $name: String) {
    addContribution(id: $id, amount: $amount, name: $name) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    addContribution: variables => (mutate({ variables })),
  }),
});
