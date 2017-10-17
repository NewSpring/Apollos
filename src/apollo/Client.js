import { ApolloClient, createNetworkInterface } from 'react-apollo';

// TODO: import URI from env
export default new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj57br21u26580181mervimzb',
  }),
});
