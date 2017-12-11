import gql from 'graphql-tag';

export default gql`
  mutation addContribution($id: String, $amount: Number, $name: String) {
    addContribution(id: $id, amount: $amount, name: $name) @client
  }
`;
