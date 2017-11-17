import gql from 'graphql-tag';

export default gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      id
      token
      tokenExpires
    }
  }
`;
