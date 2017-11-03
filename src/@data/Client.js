import { ApolloClient, createNetworkInterface } from 'react-apollo';

// TODO: import URI from env
export default new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.newspring.cc/graphql',
  }),
});
