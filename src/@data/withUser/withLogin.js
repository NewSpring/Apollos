import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
} from 'react-native';
import get from 'lodash/get';

export const MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    login: async ({ email, password } = {}) => {
      try {
        const r = await mutate({
          variables: {
            email,
            password,
          },
        });
        await AsyncStorage.setItem('authToken', get(r, 'data.loginUser.token'));
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
