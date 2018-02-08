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
        id
        amount
        account {
          id
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
      start: ownProps.start || (ownProps.year ? moment().year(ownProps.year) : moment()).startOf('year').format(),
      end: ownProps.end || (ownProps.year ? moment().year(ownProps.year) : moment()).endOf('year').format(),
    },
  }),
});

