import gql from 'graphql-tag';

export default gql`
  mutation play($id: String) {
    play(id: $id) @client
  }
`;
