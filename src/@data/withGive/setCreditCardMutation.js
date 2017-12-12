import gql from 'graphql-tag';

export default gql`
  mutation setCreditCard($cardNumber: String!, $expirationDate: String!, $cvv: String) {
    setCreditCard(cardNumber: $cardNumber, expirationDate: $expirationDate, cvv: $cvv) @client
  }
`;
