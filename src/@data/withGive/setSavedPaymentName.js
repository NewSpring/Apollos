import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setSavedPaymentName($name: String!) {
    setSavedPaymentName(name: $name) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setSavedPaymentName: name => (mutate({
      variables: {
        name,
      },
    })),
  }),
});
