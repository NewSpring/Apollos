import gql from 'graphql-tag';

export default gql`
  query CashTag($tag: String!) {
    account: accountFromCashTag(cashTag: $tag) {
      name
    }
  }
`;
