import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setSavedPaymentMethod($id: String!) {
    setSavedPaymentMethod(id: $id) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setSavedPaymentMethod: id => (mutate({
      variables: {
        id,
      },
    })),
  }),
});
