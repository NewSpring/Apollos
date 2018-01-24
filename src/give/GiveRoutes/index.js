import React, { PureComponent } from 'react';
import {
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from '@ui/NativeWebRouter';
import TabView, { SceneMap } from '@ui/TabView';

import Dashboard from 'give/Dashboard';
import Now from 'give/Now';
import ContributionHistory from 'give/ContributionHistory';
import GiveHeader from './GiveHeader';
import TabViewPagerPan from './TabViewPagerPanPatched';

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
    Header: GiveHeader,
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

  renderHeader = props => (
    <this.props.Header
      headerTitle={this.currentRoute.headerTitle}
      {...props}
    />
  );

  render() {
    if (!this.currentRoute) return null;
    return (
      <TabView
        initialIndex={this.currentRouteIndex}
        routes={this.props.routes}
        renderScene={this.props.scenes}
        renderHeader={this.renderHeader}
        onChangeFinished={Platform.OS === 'web' && this.handleOnChangeTab}
        renderPager={Platform.OS === 'web' ? props => (<TabViewPagerPan {...props} />) : undefined}
      />
    );
  }
}

export default withRouter(GiveRoutes);
