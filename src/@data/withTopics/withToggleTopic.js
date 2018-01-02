import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
    })),
  }),
});
