import { Analytics, Event, PageHit } from 'expo-analytics';

const analytics = new Analytics('UA-7130289-39');
const analyticsEvent = ({ categoryName, eventName, label }) =>
  analytics
    .event(new Event(categoryName, eventName, label))
    .then(() => console.log('Success'))
    .catch(e => console.log(e.message));

const analyticsScreen = ({ screenName }) =>
  analytics
    .hit(new PageHit(screenName))
    .then(() => console.log('Success'))
    .catch(e => console.log(e.message));

const setUserId = userId => new Analytics('UA-7130289-39', { uid: userId });

const googleAnalytics = {
  analytics,
  analyticsEvent,
  analyticsScreen,
  setUserId,
};

export default googleAnalytics;
