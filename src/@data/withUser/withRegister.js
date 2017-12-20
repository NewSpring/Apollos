import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation registerUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    registerUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    register: (params = {}) => {
      const {
        email,
        password,
        firstName,
        lastName,
      } = params;

      return mutate({
        variables: {
          email,
          password,
          firstName,
          lastName,
        },
      });
    },
  }),
});
