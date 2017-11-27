import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import * as MediaPlayerQueryResolvers from './withMediaPlayer/queries';
import * as MediaPlayerMutationResolvers from './withMediaPlayer/mutations';
import authenticationLink from './withUser/authenticationLink';

const ClientStateLink = withClientState({
  Query: {
    ...MediaPlayerQueryResolvers,
  },
  Mutation: {
    ...MediaPlayerMutationResolvers,
  },
});

const httpLink = createHttpLink({ uri: 'https://api.newspring.cc/graphql' });

export default new ApolloClient({
  link: ClientStateLink.concat(
    authenticationLink.concat(httpLink),
  ),
  cache: new InMemoryCache(),
});
