import { graphql } from 'react-apollo';
import checkoutQuery from './checkoutQuery';

export default graphql(checkoutQuery, {
  options: {
    variables: {
      state: 28,
      country: 45,
    },
  },
  props({ ownProps, data }) {
    const {
      campuses,
      countries,
      states,
      person,
      savedPaymentMethods,
      loading,
    } = data;

    return ({
      isLoading: ownProps.isLoading || loading,
      campuses: campuses || [],
      countries: (countries || []).map(c => ({ label: c.description, id: c.value })),
      states: (states || []).map(s => ({ label: s.description, id: s.value })),
      person,
      savedPaymentMethods: (savedPaymentMethods || []).map(pm => ({
        ...pm,
        paymentMethod: pm.payment.paymentType === 'ACH' ? 'bankAccount' : 'creditCard',
        accountNumber: pm.payment.accountNumber,
      })),
    });
  },
});
