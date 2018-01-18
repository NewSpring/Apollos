import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import cache from '../cache';

// TODO: flush out with query interface for mocking tests
const typeDefs = `
  Query {

  }
`;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });


export default new ApolloClient({
  cache,
  link: new SchemaLink({ schema }),
});
