import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import updateSavedPaymentMethod from './updateSavedPaymentMethod';

export const MUTATION = gql`
  mutation UpdateSavedPayment($id: Int, $name: String!) {
    updateSavedPayment(entityId: $id, name: $name) {
      error
      code
      success
      savedPaymentMethod: savedPayment {
        id: entityId
        name
      }
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    updateSavedPaymentMethod: ({ id, name } = {}) => mutate({
      variables: { id, name },
      optimisticResponse: {
        __typename: 'Mutation',
        updateSavedPayment: {
          error: null,
          code: null,
          success: true,
          savedPaymentMethod: {
            __typename: 'SavedPayment',
            id,
            name,
          },
          __typename: 'SavePaymentMutationResponse',
        },
      },
      update(_, { data }) {
        return updateSavedPaymentMethod(get(data, 'updateSavedPayment.savedPaymentMethod', {}));
      },
    }),
  }),
});
