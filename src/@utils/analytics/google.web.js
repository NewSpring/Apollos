import ReactGA from 'react-ga';

ReactGA.initialize('UA-7130289-39');

const analyticsEvent = ({ categoryName, eventName, label }) =>
  ReactGA.event({ category: categoryName, action: eventName, label });

const analyticsScreen = ({ screenName }) => ReactGA.pageview(screenName);

const googleAnalytics = {
  analyticsEvent,
  analyticsScreen,
};

export default googleAnalytics;
