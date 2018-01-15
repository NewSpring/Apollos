import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import pushNewPaymentMethod from '@data/withGivingDashboard/pushNewPaymentMethod';

export const MUTATION = gql`
  mutation completeOrder($token: ID!, $name: String, $id: ID) {
    response: completeOrder(token: $token, accountName: $name, scheduleId: $id) {
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
    completeOrder: variables => (mutate({
      variables,
      update(_, { data: { error, response: { savedPaymentMethod } } }) {
        if (error) return error;
        return pushNewPaymentMethod(savedPaymentMethod);
      },
    })),
  }),
});
