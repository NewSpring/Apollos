import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
  link: createHttpLink({ uri: 'https://api.newspring.cc/graphql' }),
  cache: new InMemoryCache(),
});
