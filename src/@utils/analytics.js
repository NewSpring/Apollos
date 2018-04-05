import React, { Component } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Analytics, Hits as GAHits } from 'react-native-google-analytics';
import Settings from '@utils/Settings';

const analytics = new Analytics(
  'UA-7130289-39',
  null,
  Settings.COMMIT_SHA,
  `${Platform.OS} ${Platform.Version}`,
);
export default analytics;

export const withPageTracking = (WrappedComponent) => {
  const trackPage = (page) => {
    const screenView = new GAHits.ScreenView('NewSpring', page);
    analytics.send(screenView);
  };

  class HOC extends Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    };

    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return HOC;
};
