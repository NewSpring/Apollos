import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import removeSavedPaymentMethod from './removeSavedPaymentMethod';

export const MUTATION = gql`
  mutation RemoveSavedPayment($id: Int!) {
    cancelSavedPayment(entityId: $id) {
      error
      code
      success
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    removeSavedPaymentMethod: id => (mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        cancelSavedPayment: {
          error: null,
          code: null,
          success: true,
          __typename: 'SavePaymentMutationResponse',
        },
      },
      update() {
        return removeSavedPaymentMethod(id);
      },
    })),
  }),
});
