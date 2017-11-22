import gql from 'graphql-tag';

export default gql`
  mutation registerUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    registerUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`;
