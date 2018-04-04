import { onError } from 'apollo-link-error';
import sentry from '@utils/sentry';

const link = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({
      message,
      locations,
      path,
    }) => {
      const msg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
      console.error(msg);
      sentry.captureException(msg);
    });
  }

  if (networkError) {
    const msg = `[Network error]: ${networkError}`;
    console.error(msg);
    sentry.captureException(msg);
  }
});

export default link;
