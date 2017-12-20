import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
} from 'react-native';

export const MUTATION = gql`
  mutation logoutUser {
    logoutUser @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    logout: async () => {
      try {
        await AsyncStorage.removeItem('authToken');

        return mutate();
      } catch (err) {
        throw err;
      }
    },
  }),
});
