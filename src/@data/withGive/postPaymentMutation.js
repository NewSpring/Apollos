import gql from 'graphql-tag';

export default gql`
  mutation postPayment {
    postPayment @client
  }
`;
