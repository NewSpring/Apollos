import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Client from '@data/Client';
import { QUERY as contributionsQuery } from './withContributions';
import getOrderDetails from './selectors/getOrderDetails';

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
    createOrder() {
      const { contributions: state } = Client.readQuery({
        query: contributionsQuery,
      });
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
