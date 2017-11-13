import { gql } from 'react-apollo';

export default gql`
  query GivingDashboard($filters: [String]!) {
    scheduledTransactions(cache: false) {
      id
      start
      details {
        account {
          name
        }
        amount
      }
      transactions {
        date
      }
      schedule {
        description
      }
    }
    savedPayments(cache: false){
      id: entityId
      name
      payment {
        accountNumber
        paymentType
      }
    }
    userFeed(filters: $filters) {
      ... on Transaction {
        id
        date
        summary
        status
        statusMessage
        schedule {
          id
        }
        details {
          amount
          account {
            name
          }
        }
      }
      ... on SavedPayment {
        name
        expirationYear
        expirationMonth
      }
    }
  }
`;
