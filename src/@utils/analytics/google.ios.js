import { Analytics, Event, PageHit } from 'expo-analytics';

const analytics = new Analytics('UA-7130289-39');
const analyticsEvent = ({ categoryName, eventName, label }) =>
  analytics.event(new Event(categoryName, eventName, label));

const analyticsScreen = ({ screenName }) => analytics.hit(new PageHit(screenName));

const googleAnalytics = {
  analytics,
  analyticsEvent,
  analyticsScreen,
};

export default googleAnalytics;
