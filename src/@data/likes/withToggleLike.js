import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import get from 'lodash/get';
import Client from '@data/Client';
import { withProtectedFunction } from '@ui/NativeWebRouter';
import { contentCard, groupCard } from './fragments';

// TODO: groups cannot be liked yet
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

export default compose(
  graphql(MUTATION, {
    props: ({ mutate }) => ({
      toggleLike: (nodeId) => {
        const state = Client.readFragment({
          id: `Content:${nodeId}`,
          fragment: contentCard,
        });

        return mutate({
          variables: {
            nodeId,
          },
          optimisticResponse: {
            toggleLike: {
              __typename: 'LikesMutationResponse',
              like: {
                __typename: 'Content',
                entryId: nodeId,
                content: {
                  __typename: 'ContentData',
                  isLiked: !get(state, 'content.isLiked'),
                },
              },
            },
          },
        });
      },
    }),
  }),
  withProtectedFunction((protect, { toggleLike }) => ({
    toggleLike: nodeId => protect(() => toggleLike(nodeId)),
  })),
);
