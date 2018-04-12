import { Platform } from 'react-native';
import instance from './instance';

// Events
const AppBecameInactive = 'AppBecameInactive';
const AppBecameActive = 'AppBecameActive';
const AppBecameBackgrounded = 'AppBecameBackgrounded';
const ScreenView = 'ScreenView';
const Liked = 'Liked';
const Shared = 'Shared';
const Login = 'Login';
const Register = 'Register';
const ForgotPassword = 'ForgotPassword';
const ContactedGroup = 'ContactedGroup';
const GivingStarted = 'GivingStarted';
const AudioPlayed = 'AudioPlayed';
const AudioPaused = 'AudioPaused';

export const events = {
  AppBecameInactive,
  AppBecameActive,
  AppBecameBackgrounded,
  ScreenView,
  Liked,
  Shared,
  Login,
  Register,
  ForgotPassword,
  ContactedGroup,
  GivingStarted,
  AudioPlayed,
  AudioPaused,
};

const nativeOnlyEvents = {
  AppBecameInactive,
  AppBecameActive,
  AppBecameBackgrounded,
};

// thin wrappers over our client events so we have a consistent API
// if we want to move away from Amplitude in the future:
export const track = (eventName, properties) => {
  if (Platform.OS === 'web' && nativeOnlyEvents[eventName]) return;
  if (properties) {
    instance.logEventWithProperties(eventName, properties);
  } else {
    instance.logEvent(eventName);
  }
};

export const identify = (userId, userProperties) => {
  instance.setUserId(userId);
  if (userProperties) instance.setUserProperties(userProperties);
};

export const trackScreen = (screenName, screenProperties) => {
  track(events.ScreenView, {
    screen: screenName,
    ...screenProperties,
  });
};


const Analytics = {
  track,
  trackScreen,
  identify,
};

export default Analytics;
