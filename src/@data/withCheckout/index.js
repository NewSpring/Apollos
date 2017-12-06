import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import checkoutQuery from './checkoutQuery';
import createOrderMutation from './createOrderMutation';

// May need to remap props here
import formatPersonDetails from './formatPersonDetails';

export const withCheckoutQuery = graphql(checkoutQuery, {
  options: { variables: { state: 28, country: 45 } },
  props({ data }) {
    const {
      campuses = [],
      countries = [],
      states = [],
      person,
      savedPayments,
      loading,
    } = data;

    return ({
      isLoading: loading,
      campuses,
      countries: countries.map(c => ({ label: c.description, id: c.value })),
      states: states.map(s => ({ label: s.description, id: s.value })),
      person,
      savedPayments,
    });
  },
});

// NOTE: They create order after capturing a billing address
export const withCheckoutMutation = graphql(createOrderMutation, {
  props: ({ mutate }) => ({
    createOrder: data => (mutate({
      variables: {
        data: JSON.stringify(formatPersonDetails(data)),
        id: null,
        instant: false,
      },
    })),
  }),
});

export default compose(
  withCheckoutMutation,
  withCheckoutQuery,
);
