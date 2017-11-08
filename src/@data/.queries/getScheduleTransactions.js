import { gql } from 'react-apollo';

export default gql`
  query GetScheduleTransactions {
    schedules: scheduledTransactions(cache: false) {
      numberOfPayments
      next
      end
      id
      entityId
      reminderDate
      code
      gateway
      start
      date
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
    }
  }
`;
