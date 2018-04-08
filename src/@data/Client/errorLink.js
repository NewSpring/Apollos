import { onError } from 'apollo-link-error';
import sentry from '@utils/sentry';

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const msg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
      sentry.captureException(msg);
    });
  }

  if (networkError) {
    const msg = `[Network error]: ${networkError}`;
    sentry.captureException(msg);
  }
});

export default link;
