import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setContributionFrequency($id: String!) {
    setContributionFrequency(id: $id) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setContributionFrequency: id => (mutate({
      variables: {
        id,
      },
    })),
  }),
});
