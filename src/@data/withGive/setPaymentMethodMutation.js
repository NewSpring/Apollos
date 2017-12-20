import gql from 'graphql-tag';

export default gql`
  mutation setPaymentMethod($method: String!) {
    setPaymentMethod(method: $method) @client
  }
`;
