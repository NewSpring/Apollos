import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { matchPath, withRouter } from '@ui/NativeWebRouter';
import TabView, { SceneMap } from '@ui/TabView';

import Dashboard from 'give/Dashboard';
import Now from 'give/Now';
import ContributionHistory from 'give/ContributionHistory';
import GiveHeader from './GiveHeader';

class GiveRoutes extends PureComponent {
  static propTypes = {
    Header: TabView.propTypes.renderHeader,
  };

  static defaultProps = {
    Header: GiveHeader,
  };

  get currentRouteIndex() {
    // eslint-disable-next-line
    return this.routes.findIndex(route => (matchPath(this.props.location.pathname, {
      path: route.path,
      exact: true,
    })));
  }

  get currentRoute() {
    return this.routes[this.currentRouteIndex];
  }

  scenes = SceneMap({
    Dashboard,
    Now,
    ContributionHistory,
  });

  routes = [
    {
      title: 'Dashboard',
      headerTitle: 'My Giving',
      key: 'Dashboard',
      path: '/give',
    },
    {
      title: 'Now',
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
  ];

  renderHeader = props => (
    <this.props.Header
      headerTitle={this.currentRoute.headerTitle}
      {...props}
    />
  );

  render() {
    return (
      <TabView
        initialIndex={this.currentRouteIndex}
        routes={this.routes}
        renderScene={this.scenes}
        renderHeader={this.renderHeader}
      />
    );
  }
}

export default withRouter(GiveRoutes);
