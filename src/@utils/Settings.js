import {
  Platform,
} from 'react-native';
import pickBy from 'lodash/pickBy';
import startsWith from 'lodash/startsWith';
import mapKeys from 'lodash/mapKeys';

const platformPrefix = Platform.OS === 'web' ? 'REACT_APP_' : 'REACT_NATIVE_';
const configs = pickBy(process.env, (v, k) => (startsWith(k, platformPrefix)));
const normalizedConfigs = mapKeys(configs, (v, k) => (k.replace(platformPrefix, '')));

export default normalizedConfigs;
