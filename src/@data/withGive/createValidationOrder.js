import { graphql } from 'react-apollo';
import isEmpty from 'lodash/isEmpty';
import Client from '@data/Client';
import removeUndefined from '@utils/removeUndefined';
import { QUERY as contributionsQuery } from './withContributions';
import { MUTATION } from './createOrder';

// NOTE: They create order after capturing a billing address
// Works kind of like a thunk
export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    createValidationOrder() {
      const { contributions: state } = Client.readQuery({
        query: contributionsQuery,
      });
      const orderDetails = removeUndefined({
        billing: {
          'first-name': state.firstName,
          'last-name': state.lastName,
          email: state.email,
          address1: state.street1,
          address2: state.street2,
          city: state.city,
          state: state.state,
          postal: state.zipCode,
        },
        'merchant-defined-field-2': isEmpty(state.campusId) ? undefined : state.campusId,
        amount: 0,
      });

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
