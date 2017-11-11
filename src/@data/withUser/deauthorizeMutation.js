import gql from 'graphql-tag';

export default gql`
  mutation deauthorize($token: String) {
    deauthorize(token: $token) {
      id
    }
  }
`;
