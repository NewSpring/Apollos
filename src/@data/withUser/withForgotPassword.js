import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation forgotUserPassword($email: String!, $sourceURL: String) {
    forgotUserPassword(email: $email, sourceURL: $sourceURL)
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    forgotPassword: (params = {}) => {
      const {
        email,
        sourceURL = '',
      } = params;

      return mutate({
        variables: {
          email,
          sourceURL,
        },
      });
    },
  }),
});
