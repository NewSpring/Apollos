import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const QUERY = gql`
  query GetScheduleTransactions {
    schedules: scheduledTransactions(cache: false) {
      id
      entityId
      numberOfPayments
      next
      end
      reminderDate
      code
      gateway
      start
      date
      details {
        id
        amount
        account {
          id
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
        id
        value
        description
      }
    }
  }
`;

export default graphql(QUERY, {
  props: ({ data: { error, schedules } }) => ({
    error,
    schedules,
  }),
});

