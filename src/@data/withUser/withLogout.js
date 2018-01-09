import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
} from 'react-native';

import { QUERY as USER_QUERY } from './withUser';

export const MUTATION = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    logout: async () => {
      try {
        const r = await mutate({
          update: (proxy) => {
            const query = USER_QUERY;
            const data = proxy.readQuery({ query });
            data.person = null;
            proxy.writeQuery({ query, data });
          },
        });
        await AsyncStorage.removeItem('authToken');
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
