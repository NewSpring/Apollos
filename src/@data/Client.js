import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import * as MediaPlayerQueryResolvers from './withMediaPlayer/queries';
import * as MediaPlayerMutationResolvers from './withMediaPlayer/mutations';

const ClientStateLink = withClientState({
  Query: {
    ...MediaPlayerQueryResolvers,
  },
  Mutation: {
    ...MediaPlayerMutationResolvers,
  },
});

export default new ApolloClient({
  link: ClientStateLink.concat(
    createHttpLink({ uri: 'https://api.newspring.cc/graphql' }),
  ),
  cache: new InMemoryCache(),
});
