import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation ValidateCard ($token: ID!) {
    response: validate(token: $token) {
      error
      success
      code
    }
  }
`;

// For non-saved CC only START
export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    validateCard: token => (mutate({
      variables: {
        token,
      },
    })),
  }),
});
