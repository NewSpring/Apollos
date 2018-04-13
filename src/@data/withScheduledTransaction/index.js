import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const QUERY = gql`
  query GetScheduleTransaction($id: ID!) {
    transaction: node(id: $id) {
      ... on ScheduledTransaction {
        numberOfPayments
        next
        end
        id
        transactionId: entityId
        reminderDate
        gateway
        start
        date
        isActive
        details {
          amount
          account {
            name
            description
          }
        }
        payment {
          paymentType
          accountNumber
          id
        }
        schedule {
          value
          description
        }
        transactions {
          id
          date
          status
          summary
          person {
            id
            firstName
            lastName
            photo
          }
          details {
            id
            amount
            account {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.id,
    },
  }),
  props: ({ data: { error, transaction, loading } }) => ({
    error,
    transaction,
    isLoading: loading,
  }),
});

