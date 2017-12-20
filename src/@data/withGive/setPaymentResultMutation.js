import gql from 'graphql-tag';

export default gql`
  mutation setPaymentResult($error: String, $success: Boolean) {
    setPaymentResult(error: $error, success: $success) @client
  }
`;
