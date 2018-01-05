import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { QUERY as CONTRIBUTIONS_QUERY } from '@data/withGive/withContributions';

export const MUTATION = gql`
  mutation savePayment($token: ID!, $name: String!, $id: String) {
    response: savePayment(token: $token, accountName: $name, gateway: $id) {
      error
      success
      code
      savedPaymentMethods: savedPayment {
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
    savePaymentMethod: variables => (mutate({
      variables,
      refetchQueries: [{ query: CONTRIBUTIONS_QUERY }], // LEFT OFF HERE, this didn't work for some reason, may need to use update instead :/
    })),
  }),
});
