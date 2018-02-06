import React, { PureComponent } from 'react';
import {
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { TabViewPagerPan, TabViewPagerAndroid } from 'react-native-tab-view';
import { matchPath, withRouter } from '@ui/NativeWebRouter';
import TabView, { SceneMap } from '@ui/TabView';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';

import Dashboard from 'give/Dashboard';
import Now from 'give/Now';
import ContributionHistory from 'give/ContributionHistory';

let TabViewPager = TabViewPagerPan;
if (Platform.OS === 'android') TabViewPager = TabViewPagerAndroid;

class GiveRoutes extends PureComponent {
  static propTypes = {
    Header: TabView.propTypes.renderHeader,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    routes: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      headerTitle: PropTypes.string,
      key: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    scenes: TabView.propTypes.renderScene,
  };

  static defaultProps = {
    routes: [
      {
        title: 'Dashboard',
        headerTitle: 'My Giving',
        key: 'Dashboard',
        path: '/give',
      },
      {
        title: 'Give Now',
        headerTitle: 'My Giving',
        key: 'Now',
        path: '/give/now',
      },
      {
        title: 'History',
        headerTitle: 'My Giving',
        key: 'ContributionHistory',
        path: '/give/history',
      },
    ],
    scenes: SceneMap({
      Dashboard,
      Now,
      ContributionHistory,
    }),
  };

  get currentRouteIndex() {
    return this.props.routes.findIndex(route => (matchPath(this.props.location.pathname, {
      path: route.path,
      exact: true,
    })));
  }

  get currentRoute() {
    return this.props.routes[this.currentRouteIndex];
  }

  handleOnChangeTab = (routeIndex) => {
    const nextRoute = this.props.routes[routeIndex];
    if (nextRoute) {
      // NOTE: It's only actually relevant in web
      // so we can prevent rerenders by using the History
      // API directly
      window.history.replaceState(window.history.state, '', nextRoute.path);
    }
  };

  render() {
    if (!this.currentRoute) return null;
    return (
      <BackgroundView>
        <Header
          webEnabled
          backButton={Platform.OS !== 'web'}
          titleText={'My Giving'}
        />
        <TabView
          initialIndex={this.currentRouteIndex}
          routes={this.props.routes}
          renderScene={this.props.scenes}
          onChange={Platform.OS === 'web' && this.handleOnChangeTab}
          // NOTE: We need to use TabViewPagerExperimental to be able to return to the
          // correct index position on native
          renderPager={props => (<TabViewPager {...props} />)}
        />
      </BackgroundView>
    );
  }
}

export default withRouter(GiveRoutes);
