import { createHttpLink } from 'apollo-link-http';
// import Settings from '@utils/Settings';

export default createHttpLink({ uri: 'https://alpha-api.newspring.cc/graphql' });
