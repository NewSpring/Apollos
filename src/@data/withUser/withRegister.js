import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import {
  AsyncStorage,
} from 'react-native';

export const MUTATION = gql`
  mutation registerUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    registerUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
      token
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    register: async (params = {}) => {
      try {
        const {
          email,
          password,
          firstName,
          lastName,
        } = params;

        const r = await mutate({
          variables: {
            email,
            password,
            firstName,
            lastName,
          },
        });
        await AsyncStorage.setItem('authToken', get(r, 'data.registerUser.token'));
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
