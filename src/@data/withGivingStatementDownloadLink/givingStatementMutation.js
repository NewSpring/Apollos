import { gql } from 'react-apollo';

// TODO: Not sure why this is a mutation
export default gql`
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
