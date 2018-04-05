import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import { AsyncStorage } from 'react-native';

export const MUTATION = gql`
  mutation resetUserPassword($token: String!, $newPassword: String!) {
    resetUserPassword(token: $token, newPassword: $newPassword) {
      id
      token
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    resetPassword: async (params = {}) => {
      try {
        const {
          token,
          newPassword,
        } = params;

        const r = await mutate({
          variables: {
            token,
            newPassword,
          },
        });
        await AsyncStorage.setItem('authToken', get(r, 'data.resetUserPassword.token'));
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
