import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation RemoveSavedPayment($id: Int!) {
    payment: cancelSavedPayment(entityId: $id) {
      error
      code
      success
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    remove: id => (mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        payment: {
          error: null,
          code: null,
          success: true,
          __typename: 'SavePaymentMutationResponse',
        },
      },
    })),
  }),
});
