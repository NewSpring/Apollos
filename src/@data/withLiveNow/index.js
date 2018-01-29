import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const liveNowQuery = gql`
query {
  live {
    live
    embedUrl
  }
}
`;

export default graphql(liveNowQuery, {
  props: ({ data: { live = {} } = {} }) => ({
    isLive: live.live,
    embedUrl: live.embedUrl,
  }),
  options: () => ({
    fetchPolicy: 'cache-and-network',
    pollInterval: 5000,
  }),
});

