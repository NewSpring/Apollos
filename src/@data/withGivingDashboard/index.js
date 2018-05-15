import { graphql } from 'react-apollo';
import { compose, withPropsOnChange } from 'recompose';
import givingDashboardQuery from './givingDashboardQuery';

export default compose(
  graphql(givingDashboardQuery, {
    props: ({ data, ownProps }) => ({
      isLoading: ownProps.isLoading || data.loading,
      scheduledTransactions: data.scheduledTransactions || [],
      activityItems: data.activityItems || [],
      savedPaymentMethods: data.savedPaymentMethods || [],
    }),
  }),
  withPropsOnChange(['savedPaymentMethods'], ({ savedPaymentMethods }) => ({
    savedPaymentMethods: savedPaymentMethods.map(pm => ({
      ...pm,
      paymentMethod: pm.payment.paymentType === 'ACH' ? 'bankAccount' : 'creditCard',
      accountNumber: pm.payment.accountNumber,
    })),
  })),
);
