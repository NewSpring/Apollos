import { graphql } from 'react-apollo';
import Client from '@data/Client';
import { QUERY as contributionsQuery } from './withContributions';
import getOrderDetails from './selectors/getOrderDetails';
import { MUTATION } from './createOrder';

// NOTE: They create order after capturing a billing address
// Works kind of like a thunk
export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    createValidationOrder() {
      const { contributions: state } = Client.readQuery({
        query: contributionsQuery,
      });
      const orderDetails = getOrderDetails(state);
      orderDetails.amount = 0;

      return mutate({
        variables: {
          data: JSON.stringify(orderDetails),
          id: null,
          instant: false,
        },
      });
    },
  }),
});
