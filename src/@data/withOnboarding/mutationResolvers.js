import { AsyncStorage } from 'react-native';
import query from './query';

export async function didOnboard(result, variables, { cache }) {
  cache.writeQuery({
    query,
    variables,
    data: {
      onboarded: true,
    },
  });
  return AsyncStorage.setItem('onboarded', 'true');
}

export async function showOnboarding(result, variables, { cache }) {
  cache.writeQuery({
    query,
    variables,
    data: {
      onboarded: false,
    },
  });
  return null;
}
