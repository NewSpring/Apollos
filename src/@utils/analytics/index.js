import Settings from '@utils/Settings';
import sentry from '../sentry';
import google from './google';

// Events
const OutboundLink = 'OutboundLink';
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
const Audio = 'Audio';
const Video = 'Video';
const Content = 'Content';
const Account = 'Account';
const Give = 'Give';

export const events = {
  OutboundLink,
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

export const categories = {
  Audio,
  Video,
  Content,
  Account,
  Give,
};

// thin wrappers over our client events so we have a consistent API
// if we want to move away from Amplitude in the future:
export const track = (eventName, categoryName, label) => {
  if (Settings.NODE_ENV === 'development' || Settings.NODE_ENV === 'testing') return;
  google.analyticsEvent({ categoryName, eventName, label });
};

export const identify = (userId) => {
  if (Settings.NODE_ENV === 'development' || Settings.NODE_ENV === 'testing') return;
  google.setUserId({ userId });
};

export const trackScreen = (screenName) => {
  google.analyticsScreen({ screenName });
  sentry.captureBreadcrumb({
    message: 'ScreenView',
    data: { screenName },
    level: 'info',
  });
};

const Analytics = {
  track,
  trackScreen,
  identify,
};

export default Analytics;
