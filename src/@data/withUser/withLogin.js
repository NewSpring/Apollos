import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
} from 'react-native';
import get from 'lodash/get';

import { QUERY as LOGGED_IN_QUERY } from './withIsLoggedIn';

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
          refetchQueries: ['GivingDashboard', 'GetCheckoutData', 'SavedPaymentMethods', 'GetTransactions'],
          update: async (store, { data: { loginUser } }) => {
            const data = store.readQuery({ query: LOGGED_IN_QUERY });
            data.person = {
              __typename: 'User',
              id: loginUser.id,
            };
            store.writeQuery({ query: LOGGED_IN_QUERY, data });
            await AsyncStorage.setItem('authToken', get(loginUser, 'token'));
          },
        });
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
