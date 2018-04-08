import { graphql } from 'react-apollo';
import givingDashboardQuery from './givingDashboardQuery';

export default graphql(givingDashboardQuery, {
  options: {
    // TODO: Not thrilled about polling.
    // Setting a websocket connection instead
    // would be awesome so we can trigger changes when changes occur
    // instead and not have to deal with the refetch paradigm
    pollInterval: 500,
  },
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
