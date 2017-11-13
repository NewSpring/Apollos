import { graphql } from 'react-apollo';
import scheduledTransactionsQuery from './scheduledTransactionsQuery';

export default graphql(scheduledTransactionsQuery, {
  props: ({ data: { schedules } }) => ({
    schedules,
  }),
});

