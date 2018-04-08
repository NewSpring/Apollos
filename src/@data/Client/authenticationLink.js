import { AsyncStorage } from 'react-native';
import { setContext } from 'apollo-link-context';

export default setContext(async (_, { headers }) => {
  try {
    // get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return {};

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  } catch (err) {
    // eslint-disable-next-line
    console.error('Authorization Failed', err);
    return {};
  }
});
