import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import { AsyncStorage } from 'react-native';
import { track, events, categories } from '@utils/analytics';

import { QUERY as LOGGED_IN_QUERY } from './withIsLoggedIn';

export const MUTATION = gql`
  mutation registerUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
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
          email, password, firstName, lastName,
        } = params;

        const r = await mutate({
          variables: {
            email,
            password,
            firstName,
            lastName,
          },
          update: async (store, { data: { registerUser } }) => {
            const data = store.readQuery({ query: LOGGED_IN_QUERY });
            data.person = {
              __typename: 'User',
              id: registerUser.id,
            };
            store.writeQuery({ query: LOGGED_IN_QUERY, data });
            track(events.Login, categories.Account, data.person.id);
            track(events.Register, categories.Account, data.person.id);
            await AsyncStorage.setItem('authToken', get(registerUser, 'token'));
          },
        });
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
