import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import pushNewPaymentMethod from '@data/withGivingDashboard/pushNewPaymentMethod';

export const MUTATION = gql`
  mutation savePayment($token: ID!, $name: String!, $id: String) {
    response: savePayment(token: $token, accountName: $name, gateway: $id) {
      error
      success
      code
      savedPaymentMethod: savedPayment {
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
      // NOTE: refetch is less efficient but if query shapes change this won't need to
      // refetchQueries: ['GivingDashboard'],
      update(_, { data: { error, response: { savedPaymentMethod } } }) {
        if (error) return error;
        return pushNewPaymentMethod(savedPaymentMethod);
      },
    })),
  }),
});
