import { graphql } from 'react-apollo';
import givingDashboardQuery from './givingDashboardQuery';

export default graphql(givingDashboardQuery, {
  props: ({ data, ownProps }) => ({
    isLoading: ownProps.isLoading || data.loading,
    scheduledTransactions: data.scheduledTransactions || [],
    activityItems: data.activityItems || [],
    savedPaymentMethods: (data.savedPaymentMethods || []).map(pm => ({
      ...pm,
      paymentMethod: pm.payment.paymentType === 'ACH' ? 'bankAccount' : 'creditCard',
      accountNumber: pm.payment.accountNumber,
    })),
  }),
});
