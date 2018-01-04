import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
} from 'react-native';
import get from 'lodash/get';

import { QUERY as CURRENT_USER_QUERY } from './withUser';

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
          update: (store, { data: { loginUser } }) => {
            const data = store.readQuery({ query: CURRENT_USER_QUERY });
            data.person = {
              id: loginUser.id,
              email,
              password,
            };
            store.writeQuery({ query: CURRENT_USER_QUERY, data });
          },
          refetchQueries: [
            'CurrentPerson',
          ],
        });
        await AsyncStorage.setItem('authToken', get(r, 'data.loginUser.token'));
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
