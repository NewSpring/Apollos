import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { track, events, categories } from '@utils/analytics';

export const MUTATION = gql`
  mutation forgotUserPassword($email: String!, $sourceURL: String) {
    forgotUserPassword(email: $email, sourceURL: $sourceURL)
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    forgotPassword: (params = {}) => {
      const { email, sourceURL = '' } = params;

      track(events.ForgotPassword, categories.Account, { email }.email);

      return mutate({
        variables: {
          email,
          sourceURL,
        },
      });
    },
  }),
});
