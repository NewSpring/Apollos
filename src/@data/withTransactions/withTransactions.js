import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
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
      start: !isEmpty(get(ownProps, 'dateRange.startDate')) ? get(ownProps, 'dateRange.startDate') : undefined,
      end: !isEmpty(get(ownProps, 'dateRange.endDate')) ? get(ownProps, 'dateRange.endDate') : undefined,
    },
  }),
  props: ({ ownProps, data } = {}) => ({
    // NOTE: This should happen in Heighliner
    transactions: data.transactions && flatten(data.transactions
      .map(transaction => (transaction.details.map(detail => ({
        ...detail,
        date: transaction.date,
        transactionId: transaction.id,
        person: transaction.person,
        year: new Date(transaction.date).getFullYear(),
      })))),
    ),
    isLoading: ownProps.isLoading || data.loading,
    fetchMore: fetchMoreResolver({
      collectionName: 'transactions',
      data,
    }),
    refetch: data.refetch,
  }),
});

