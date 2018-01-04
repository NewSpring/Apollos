import { createHttpLink } from 'apollo-link-http';

// export default createHttpLink({ uri: 'https://api.newspring.cc/graphql' });
// export default createHttpLink({ uri: 'https://alpha-api.newspring.cc/graphql' });
export default createHttpLink({ uri: 'http://localhost:8888/graphql' });
