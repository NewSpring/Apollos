import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { contentCard, groupCard } from './fragments';

// Not too sure why we would need to return the content on the like
export const MUTATION = gql`
  mutation ToggleLike($nodeId: String!) {
    toggleLike(nodeId: $nodeId) {
      like {
        ... ContentCard
        ... GroupCard
      }
    }
  }
  ${contentCard}
  ${groupCard}
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    toggleLike: nodeId => (mutate({
      variables: {
        nodeId,
      },
    })),
  }),
});
