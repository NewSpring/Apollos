import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import * as MediaPlayerQueryResolvers from './mediaPlayer/queries';
import * as MediaPlayerMutationResolvers from './mediaPlayer/mutations';

import * as GiveQueryResolvers from './withGive/queries';
import * as GiveMutationResolvers from './withGive/mutations';

const ClientStateLink = withClientState({
  Query: {
    ...MediaPlayerQueryResolvers,
    ...GiveQueryResolvers,
  },
  Mutation: {
    ...MediaPlayerMutationResolvers,
    ...GiveMutationResolvers,
  },
});

export default new ApolloClient({
  link: ClientStateLink.concat(
    createHttpLink({ uri: 'https://api.newspring.cc/graphql' }),
  ),
  cache: new InMemoryCache(),
});
