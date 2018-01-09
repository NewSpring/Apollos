import { ApolloProvider } from 'react-apollo';
import { nest, withProps } from 'recompose';
import { ThemeProvider } from '@ui/theme';
import { Router } from '@ui/NativeWebRouter';
import Client from '@data/Client';

export default nest(
  withProps({ client: Client })(ApolloProvider),
  ThemeProvider,
  Router,
);
