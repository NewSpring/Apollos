import { onError } from 'apollo-link-error';
import sentry from '@utils/sentry';

const link = onError(({
  graphQLErrors, networkError, operation, response,
}) => {
  const operationJson = JSON.parse(JSON.stringify(operation));

  // If password is true, protect password from displaying in Sentry
  if (operationJson.variables.password) {
    operationJson.variables.password = '';
  }
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const msg = `[GraphQL error]: Message: ${message},
        Location: ${JSON.stringify(locations)},
        Path: ${path},
        Response: ${JSON.stringify(response)},
        Operation: ${JSON.stringify(operationJson)}`;
      sentry.captureException(msg);
    });
  }

  if (networkError) {
    const msg = `[Network error]: ${networkError},
      Response: ${JSON.stringify(response)},
      Operation: ${JSON.stringify(operationJson)}`;
    sentry.captureException(msg);
  }
});

export default link;
