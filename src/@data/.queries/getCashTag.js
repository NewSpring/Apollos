import { gql } from 'react-apollo';

export default gql`
  query CashTag($tag: String!) {
    account: accountFromCashTag(cashTag: $tag) {
      name
    }
  }
`;
