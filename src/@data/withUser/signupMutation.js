import gql from 'graphql-tag';

export default gql`
  mutation register($email: String!, password: String!, firstName: String!, lastName: String!) {
    register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
      token
      tokenExpires
    }
  }
`;
