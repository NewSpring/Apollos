import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { track, events, categories } from '@utils/analytics';
import Settings from '@utils/Settings';

export const MUTATION = gql`
  mutation forgotUserPassword($email: String!, $sourceURL: String) {
    forgotUserPassword(email: $email, sourceURL: $sourceURL)
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    forgotPassword: (params = {}) => {
      // pull app domain from environment variables
      // if there isn't one set, use the expo default dev url
      const { email, sourceURL = `${Settings.APP_ROOT_URL || 'http://localhost:3000'}` } = params;

      track(events.ForgotPassword, categories.Account, params.email);

      return mutate({
        variables: {
          email,
          sourceURL,
        },
      });
    },
  }),
});
