import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import transactionsToChartDataMapper from './transactionsToChartDataMapper';

export const QUERY = gql`
  query givingSummary($start: String!, $end: String!) {
    transactions(start: $start, end: $end, limit: 0) {
      id
      date
      details {
        amount
        account {
          name
        }
      }
    }
  }
`;

export default graphql(QUERY, {
  props: ({ data: { transactions } }) => (
    transactionsToChartDataMapper(transactions || [])
  ),
  options: (ownProps = {}) => ({
    variables: {
      start: ownProps.start || moment().startOf('year').format(),
      end: ownProps.end || moment().endOf('year').format(),
    },
  }),
});

