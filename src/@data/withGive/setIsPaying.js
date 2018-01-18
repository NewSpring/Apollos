import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation isPaying($isPaying: Boolean!) {
    isPaying(isPaying: $isPaying) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    isPaying: isPaying => (mutate({
      variables: {
        isPaying,
      },
    })),
  }),
});
