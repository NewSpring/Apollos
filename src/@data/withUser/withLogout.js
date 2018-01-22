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
          refetchQueries: ['GivingDashboard', 'GetCheckoutData', 'SavedPaymentMethods'],
          update: async (proxy) => {
            const query = USER_QUERY;
            const data = proxy.readQuery({ query });
            data.person = null;
            await AsyncStorage.removeItem('authToken');
            proxy.writeQuery({ query, data });
          },
        });
        return r;
      } catch (err) {
        throw err;
      }
    },
  }),
});
