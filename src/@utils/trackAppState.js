import { AppState } from 'react-native';
import { track, events } from '@utils/analytics';

const trackAppState = () => {
  const handleAppStateChange = (nextAppState) => {
    switch (nextAppState) {
      case 'active':
        track(events.AppBecameActive);
        break;
      case 'inactive':
        track(events.AppBecameInactive);
        break;
      case 'background':
        track(events.AppBecameBackgrounded);
        break;
      default:
        break;
    }
  };
  AppState.addEventListener('change', handleAppStateChange);
};

export default trackAppState;
