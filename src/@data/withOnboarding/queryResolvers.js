import { AsyncStorage } from 'react-native';

export async function onboarded() {
  let didOnboard = await AsyncStorage.getItem('onboarded');
  if (typeof didOnboard === 'string') didOnboard = true;
  return !!didOnboard;
}
