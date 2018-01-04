import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
    completeOrder: token => (mutate({
      variables: {
        token,
      },
    })),
  }),
});
