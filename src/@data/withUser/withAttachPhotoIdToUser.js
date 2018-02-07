import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation attachPhotoIdToUser($id: ID!) {
    attachPhotoIdToUser(id: $id)
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    attachPhotoIdToUser: ({ id } = {}) => (mutate({
      variables: {
        id,
      },
    })),
  }),
});
