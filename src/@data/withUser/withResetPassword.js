import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation resetUserPassword($token: String!, $newPassword: String!) {
    resetUserPassword(token: $token, newPassword: $newPassword)
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    resetPassword: (params = {}) => {
      const {
        token,
        newPassword,
      } = params;

      return mutate({
        variables: {
          token,
          newPassword,
        },
      });
    },
  }),
});
