import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { QUERY as USER_QUERY } from '@data/withUser/withUser';

export const MUTATION = gql`
  mutation ToggleTopic($topic: String!) {
    toggleTopic(topic: $topic)
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    toggleTopic: topic => (mutate({
      variables: {
        topic,
      },
      update: async (store) => {
        const data = store.readQuery({ query: USER_QUERY });
        if (data.user) {
          const followedTopics = [...(data.user.followedTopics || [])];
          const idx = followedTopics.indexOf(topic);
          if (idx !== -1) {
            followedTopics.splice(idx, 1);
          } else {
            followedTopics.push(topic);
          }
          const user = { ...data.user, followedTopics };
          store.writeQuery({ query: USER_QUERY, data: { user } });
        }
      },
    })),
  }),
});
