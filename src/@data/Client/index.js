import { ApolloClient } from 'apollo-client';

import authenticationLink from './authenticationLink';
import httpLink from './httpLink';
import clientStateLink from './clientStateLink';
import errorLink from './errorLink';

import cache from './cache';

export default new ApolloClient({
  link: errorLink.concat(
    clientStateLink.concat(
      authenticationLink.concat(httpLink),
    ),
  ),
  cache,
});
