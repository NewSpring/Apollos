import {
  Platform,
} from 'react-native';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

export default function createHistory({ native = {}, web = {} } = {}) {
  return Platform.OS === 'web' ? createBrowserHistory(web) : createMemoryHistory(native);
}
