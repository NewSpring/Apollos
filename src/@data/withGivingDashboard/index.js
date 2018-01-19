import { graphql } from 'react-apollo';
import givingDashboardQuery from './givingDashboardQuery';

export default graphql(givingDashboardQuery, {
  props: ({ data, ownProps }) => {
    const paymentMethods = data.savedPaymentMethods || [];
    return ({
      isLoading: ownProps.isLoading || data.loading,
      scheduledTransactions: data.scheduledTransactions || [],
      activityItems: data.activityItems || [],
      savedPaymentMethods: paymentMethods.map(pm => ({
        ...pm,
        paymentMethod: pm.payment.paymentType === 'ACH' ? 'bankAccount' : 'creditCard',
        accountNumber: pm.payment.accountNumber,
      })),
    });
  },
  options: (ownProps = {}) => ({
    variables: {
      filters: ownProps.filters || ['GIVING_DASHBOARD'],
    },
  }),
});

