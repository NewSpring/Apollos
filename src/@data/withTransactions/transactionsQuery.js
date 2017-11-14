import gql from 'graphql-tag';

export default gql`
  query GetTransactions($limit: Int, $skip: Int, $people: [Int], $start: String, $end: String) {
    content: transactions(
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
      person { firstName, lastName, photo }
      details {
        id
        amount
        account { id, name }
      }
    }
  }
`;
