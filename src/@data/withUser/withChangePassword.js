import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation changeUserPassword($oldPassword: String!, $newPassword: String!) {
    changeUserPassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    changePassword: (params = {}) => {
      const {
        oldPassword,
        newPassword,
      } = params;

      return mutate({
        variables: {
          oldPassword,
          newPassword,
        },
      });
    },
  }),
});
