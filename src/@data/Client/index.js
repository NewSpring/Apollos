import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import authenticationLink from './authenticationLink';
import httpLink from './httpLink';
import clientStateLink from './clientStateLink';

export default new ApolloClient({
  link: clientStateLink.concat(
    authenticationLink.concat(httpLink),
  ),
  cache: new InMemoryCache(),
});
