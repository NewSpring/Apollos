import gql from 'graphql-tag';

export default gql`
  mutation setBankAccount($accountNumber: String!, $routingNumber: String!, $accountName: String!, $accountType: String!) {
    setBankAccount(accountNumber: $accountNumber, routingNumber: $routingNumber, accountName: $accountName, accountType: $accountType) @client
  }
`;
