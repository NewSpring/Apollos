import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation resetContributions {
    resetContributions @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    resetContributions: () => (mutate()),
  }),
});
