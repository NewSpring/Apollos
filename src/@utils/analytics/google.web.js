import ReactGA from 'react-ga';

ReactGA.initialize('UA-7130289-39');

const analyticsEvent = ({ categoryName, eventName, label }) =>
  ReactGA.event({ category: categoryName, action: eventName, label });

const analyticsScreen = ({ screenName }) => ReactGA.pageview(screenName);

const setUserId = ({ userId }) => ReactGA.set({ uid: userId });

const googleAnalytics = {
  analyticsEvent,
  analyticsScreen,
  setUserId,
};

export default googleAnalytics;
