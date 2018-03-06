import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const QUERY = gql`
query Live {
  live {
    live
    embedUrl
    videoUrl
  }
}
`;

export default graphql(QUERY, {
  props: ({ data: { live = {} } = {} }) => ({
    isLive: live.live,
    embedUrl: live.embedUrl,
    videoUrl: live.videoUrl,
  }),
  options: () => ({
    fetchPolicy: 'cache-and-network',
    pollInterval: 60000,
  }),
});

