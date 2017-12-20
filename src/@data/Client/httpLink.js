import { createHttpLink } from 'apollo-link-http';

export default createHttpLink({ uri: 'https://api.newspring.cc/graphql' });
