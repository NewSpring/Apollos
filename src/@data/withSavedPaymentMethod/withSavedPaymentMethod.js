import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash/get';

export const QUERY = gql`
  query SavedPayment($id: ID!) {
    savedPaymentMethod: savedPayment(id: $id) {
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
  props: ({ ownProps, data: { error, savedPaymentMethod, loading } }) => ({
    error: error || ownProps.error,
    savedPaymentMethod: {
      ...savedPaymentMethod,
      paymentType: get(savedPaymentMethod, 'payment.paymentType') === 'ACH' ? 'bankAccount' : 'creditCard',
      accountNumber: get(savedPaymentMethod, 'payment.accountNumber'),
    },
    isLoading: ownProps.isLoading || loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

