import ReactGA from 'react-ga';

const analytics = ReactGA.initialize('UA-7130289-39');

const analyticsEvent = ({ categoryName, eventName, label }) => {
  ReactGA.event({ category: categoryName, action: eventName, label });
};

const analyticsScreen = ({ screenName }) => ReactGA.pageview(screenName);

const googleAnalytics = {
  analytics,
  analyticsEvent,
  analyticsScreen,
};

export default googleAnalytics;
