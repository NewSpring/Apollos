import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import {
  AsyncStorage,
} from 'react-native';

import { QUERY as CURRENT_USER_QUERY } from './withUser';

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
          update: (store, { data: { registerUser } }) => {
            const data = store.readQuery({ query: CURRENT_USER_QUERY });
            data.person = {
              id: registerUser.id,
              email,
              firstName,
              lastName,
            };
            store.writeQuery({ query: CURRENT_USER_QUERY, data });
          },
          refetchQueries: [
            'CurrentPerson',
          ],
        });
        await AsyncStorage.setItem('authToken', get(r, 'data.registerUser.token'));
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
