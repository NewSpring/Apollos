import gql from 'graphql-tag';

export default gql`
  query GivingDashboard {
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
    savedPaymentMethods: savedPayments(cache: false){
      id: entityId
      name
      payment {
        accountNumber
        paymentType
      }
    }
    activityItems: userFeed(filters: ["GIVING_DASHBOARD"]) {
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
        id
        entityId
        name
        expirationYear
        expirationMonth
      }
    }
  }
`;
