import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const QUERY = gql`
  query Live {
    live {
      live
    }
  }
`;

export default graphql(QUERY, {
  props: ({ data: { error, live = {} } = {} }) => ({
    error,
    isLive: live.live,
    embedUrl: live.embedUrl,
  }),
  options: () => ({
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
    pollInterval: 60000,
  }),
});
