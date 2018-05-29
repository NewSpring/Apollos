import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';

import authenticationLink from './authenticationLink';
import httpLink from './httpLink';
import clientStateLink from './clientStateLink';

import cache from './cache';

const link = ApolloLink.from([clientStateLink, authenticationLink, httpLink]);

export default new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
});
