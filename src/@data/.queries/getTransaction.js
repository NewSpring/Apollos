import { gql } from 'react-apollo';

export default gql`
  query GetTransaction($transactionId: ID!) {
    transaction: node(id: $transactionId) {
      id
      ... on Transaction {
        id
        date
        summary
        status
        person {
          firstName
          nickName
          lastName
        }
        details {
          id
          amount
          account {
            name
            description
            summary
            end
            start
          }
        }
        payment {
          id
          paymentType
          accountNumber
        }
      }
    }
  }
`;
