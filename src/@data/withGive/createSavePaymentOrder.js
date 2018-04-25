import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Client from '@data/Client';
import { QUERY as contributionsQuery } from './withContributions';
import getOrderDetails from './selectors/getOrderDetails';
import { INITIAL_STATE } from './resolvers/queries';

export const MUTATION = gql`
  mutation order($data: String!, $id: ID, $instant: Boolean) {
    order: createOrder(data: $data, id: $id, instant: $instant) {
      url
      error
      success
      code
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    createSavePaymentOrder() {
      const { contributions } = Client.readQuery({
        query: contributionsQuery,
      });

      const state = {
        ...contributions,
        contributions: INITIAL_STATE.contributions,
        frequencyId: INITIAL_STATE.frequencyId,
        startDate: INITIAL_STATE.startDate,
      };

      const orderDetails = getOrderDetails(state);
      if (orderDetails.savedAccount) delete orderDetails.billing;
      const data = JSON.stringify(orderDetails);

      const isInstant = state.paymentMethod === 'savedPaymentMethod' && state.frequencyId !== 'today';
      return mutate({
        variables: {
          data,
          id: null,
          instant: isInstant,
        },
      });
    },
  }),
});
