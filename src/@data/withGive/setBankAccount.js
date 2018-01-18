import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setBankAccount($accountNumber: String!, $routingNumber: String!, $accountName: String!, $accountType: String!) {
    setBankAccount(accountNumber: $accountNumber, routingNumber: $routingNumber, accountName: $accountName, accountType: $accountType) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setBankAccount: props => (mutate({
      variables: {
        accountNumber: props.accountNumber,
        routingNumber: props.routingNumber,
        accountName: props.accountName,
        accountType: props.accountType,
      },
    })),
  }),
});
