import gql from 'graphql-tag';

export default gql`
  mutation addContribution($id: String, $amount: Number) {
    addContribution(id: $id, amount: $amount) @client
  }
`;
