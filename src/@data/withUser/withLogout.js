import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { AsyncStorage } from 'react-native';

import clearCache from '@data/Client/clearCache';

export const MUTATION = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    logout: async () => {
      try {
        const r = await mutate();
        await AsyncStorage.removeItem('authToken');
        clearCache();
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
