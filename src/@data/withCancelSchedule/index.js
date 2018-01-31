import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const MUTATION = gql`
  mutation CancelSchedule($id: Int!) {
    cancelSchedule(entityId: $id) {
      code
      success
      error
      schedule {
        entityId
      }
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    cancelSchedule: id => (mutate({
      variables: {
        id,
      },
    })),
  }),
});

