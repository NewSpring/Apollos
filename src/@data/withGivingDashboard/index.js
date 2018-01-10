import { graphql } from 'react-apollo';
import givingDashboardQuery from './givingDashboardQuery';

export default graphql(givingDashboardQuery, {
  props: ({ data, data: { savedPaymentMethods = [] } }) => ({
    ...data,
    savedPaymentMethods: savedPaymentMethods.map(pm => ({
      ...pm,
      paymentMethod: pm.payment.paymentType === 'ACH' ? 'bankAccount' : 'creditCard',
      accountNumber: pm.payment.accountNumber,
    })),
  }),
  options: (ownProps = {}) => ({
    variables: {
      filters: ownProps.filters || ['GIVING_DASHBOARD'],
    },
  }),
});

