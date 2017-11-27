import {
  AsyncStorage,
} from 'react-native';
import { setContext } from 'apollo-link-context';
import isEmpty from 'lodash/isEmpty';

export default setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('authToken');
  if (!token) return {};
  const [email, password] = token.split('::');
  if (isEmpty(email) || isEmpty(password)) return {};

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Authorization-Token': `${encodeURIComponent(atob(email))}:${encodeURIComponent(atob(password))}`,
    },
  };
});
