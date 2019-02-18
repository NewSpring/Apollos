import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

export const MUTATION = gql`
  mutation GetGivingStatement($limit: Int, $skip: Int, $people: [Int], $start: String, $end: String) {
    transactionStatement(
      limit: $limit,
      skip: $skip,
      people: $people,
      start: $start,
      end: $end
    ){
      file
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    getPDF: year => mutate({
      variables: {
        start: moment()
          .utc()
          .year(year)
          .startOf('year')
          .format('MM/DD/YYYY'),
        end: moment()
          .utc()
          .year(year)
          .endOf('year')
          .format('MM/DD/YYYY 23:59:59'),
      },
    }),
  }),
});
