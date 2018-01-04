import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation savePayment($token: ID!, $name: String!, $id: String) {
    response: savePayment(token: $token, accountName: $name, gateway: $id) {
      error
      success
      code
      savedPayment {
        id: entityId
        name
        payment {
          accountNumber
          paymentType
        }
      }
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    savePaymentMethod: variables => (mutate({ variables })),
  }),
});
