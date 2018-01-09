import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// TODO: This should respond with a saved account so we can use update
// to update the store (not required)
export const MUTATION = gql`
  mutation completeOrder($token: ID!, $name: String, $id: ID) {
    response: completeOrder(token: $token, accountName: $name, scheduleId: $id) {
      error
      success
      code
    }
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    completeOrder: variables => (mutate({
      variables,
    })),
  }),
});
