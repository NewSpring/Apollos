import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setPaymentMethod($method: String!) {
    setPaymentMethod(method: $method) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    isPayingWithCreditCard: () => (mutate({
      variables: {
        method: 'creditCard',
      },
    })),
    isPayingWithBankAccount: () => (mutate({
      variables: {
        method: 'bankAccount',
      },
    })),
    isPayingWithSavedPaymentMethod: () => (mutate({
      variables: {
        method: 'savedPaymentMethod',
      },
    })),
  }),
});
