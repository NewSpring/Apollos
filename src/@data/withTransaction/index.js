import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';

export const QUERY = gql`
  query GetTransaction($id: ID!) {
    transaction: node(id: $id) {
      id
      ... on Transaction {
        id
        date
        summary
        status
        person {
          id
          firstName
          nickName
          lastName
        }
        details {
          id
          amount
          account {
            id
            name
            description
            summary
            end
            start
          }
        }
        payment {
          id
          paymentType
          accountNumber
        }
      }
    }
  }
`;

export default graphql(QUERY, {
  props: ({ data: { transaction, loading } }) => ({
    isLoading: loading,
    transaction: {
      ...transaction,
      payment: {
        ...get(transaction, 'payment'),
        paymentMethod: get(transaction, 'payment.paymentType', '') === 'ACH' ? 'bankAccount' : 'creditCard',
      },
    },
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

