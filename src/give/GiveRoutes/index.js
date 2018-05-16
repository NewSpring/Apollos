import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { TabViewPagerPan, TabViewPagerAndroid } from 'react-native-tab-view';
import { Switch, Route, matchPath, withRouter } from '@ui/NativeWebRouter';
import TabView, { SceneMap } from '@ui/TabView';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import Meta from '@ui/Meta';

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
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        headerTitle: PropTypes.string,
        key: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),
    ),
    scenes: TabView.propTypes.renderScene,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
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
    return this.props.routes.findIndex(route =>
      matchPath(this.props.location.pathname, {
        path: route.path,
        exact: true,
      }),
    );
  }

  get currentRoute() {
    return this.props.routes[this.currentRouteIndex];
  }

  render() {
    if (!this.currentRoute) return null;
    return (
      <BackgroundView>
        <Header webEnabled backButton titleText={'My Giving'} />
        <TabView
          initialIndex={this.currentRouteIndex || 0}
          routes={this.props.routes}
          renderScene={this.props.scenes}
          renderPager={props => <TabViewPager {...props} />}
        />
        <Switch>
          <Route path="/give/history">
            <Meta title="Giving History" />
          </Route>
          <Route path="/give" exact>
            <Meta title="Giving Dashboard" />
          </Route>
          <Route>
            <Meta
              title="Give"
              image="//s3.amazonaws.com/ns.assets/apollos/you_cant_outgive_god2x1.jpg"
            />
          </Route>
        </Switch>
      </BackgroundView>
    );
  }
}

export default withRouter(GiveRoutes);
