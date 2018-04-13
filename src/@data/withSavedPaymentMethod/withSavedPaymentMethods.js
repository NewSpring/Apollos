import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query SavedPaymentMethods {
    savedPaymentMethods: savedPayments(cache: false){
      id: entityId
      name
      payment {
        accountNumber
        paymentType
      }
    }
  }
`;

export default graphql(QUERY, {
  props: ({ ownProps, data, data: { error, savedPaymentMethods, loading } }) => ({
    ...data,
    error: error || ownProps.error,
    savedPaymentMethods: (savedPaymentMethods || []).map(pm => ({
      ...pm,
      paymentMethod: pm.payment.paymentType === 'ACH' ? 'bankAccount' : 'creditCard',
      accountNumber: pm.payment.accountNumber,
    })),
    isLoading: ownProps.isLoading || loading,
  }),
});
