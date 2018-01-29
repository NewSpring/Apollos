import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const liveNowQuery = gql`
query {
  live {
    live
  }
}
`;

export default graphql(liveNowQuery, {
  props: ({ data: { live = {} } = {} }) => ({
    isLive: live.live,
    videoUrl: 'https://trinity-lh.akamaihd.net/i/NewSpringLive_d@313707/master.m3u8', // todo
  }),
  options: () => ({
    pollInterval: 30000,
  }),
});

