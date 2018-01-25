import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';

export const QUERY = gql`
  query GetTransactions($limit: Int, $skip: Int, $people: [Int], $start: String, $end: String) {
    transactions(
      limit: $limit,
      skip: $skip,
      people: $people,
      start: $start,
      end: $end,
      cache: false
    ) {
      id
      date
      status
      summary
      person { id, firstName, lastName, photo }
      details {
        id
        amount
        account { id, name }
      }
    }
  }
`;

export default graphql(QUERY, {
  options: (ownProps = {}) => ({
    variables: {
      limit: ownProps.limit || 20,
      skip: ownProps.skip || 0,
    },
  }),
  props: ({ ownProps, data } = {}) => ({
    transactions: data.transactions && data.transactions.map(transaction => ({
      ...transaction,
      // NOTE: Holtzman logic, this should be in Heighliner
      year: moment(transaction.date).utc().year(),
      details: transaction.details && transaction.details
        .filter(x => (x.amount && Number(x.amount) !== 0)),
    })),
    isLoading: ownProps.isLoading || data.loading,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});

