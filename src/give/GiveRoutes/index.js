import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { TabViewPagerPan, TabViewPagerAndroid } from 'react-native-tab-view';
import { Link, Switch, Route, matchPath, withRouter } from '@ui/NativeWebRouter';
import TabView, { SceneMap } from '@ui/TabView';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import MediaQuery from '@ui/MediaQuery';
import { ResponsiveSideBySideView as SideBySideView, Left, Right } from '@ui/SideBySideView';
import Hero, { BackgroundImage } from '@ui/Hero';
import styled from '@ui/styled';
import ContributionsChartHero from '@ui/ContributionsChartHero';
import Meta from '@ui/Meta';

import Dashboard from 'give/Dashboard';
import Now from 'give/Now';
import ContributionHistory from 'give/ContributionHistory';

let TabViewPager = TabViewPagerPan;
if (Platform.OS === 'android') TabViewPager = TabViewPagerAndroid;

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

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
    if (nextRoute && Platform.OS === 'web') { // we can skip history.replace on native to prevent a re-render
      this.props.history.replace(nextRoute.path);
    }
  };

  render() {
    if (!this.currentRoute) return null;
    return (
      <BackgroundView>
        <FlexedSideBySideView>
          <FlexedLeft>
            <Header
              webEnabled
              backButton={Platform.OS !== 'web'}
              titleText={'My Giving'}
            />
            <TabView
              index={Platform.OS === 'web' ? this.currentRouteIndex || 0 : undefined}
              initialIndex={Platform.OS !== 'web' ? this.currentRouteIndex || 0 : undefined}
              routes={this.props.routes}
              renderScene={this.props.scenes}
              onChange={Platform.OS === 'web' && this.handleOnChangeTab}
              renderPager={props => (<TabViewPager {...props} />)}
            />
          </FlexedLeft>
          <MediaQuery minWidth="md">
            <Right>
              <Switch style={StyleSheet.absoluteFill}>
                <Route path="/give/history">
                  <Hero background={<BackgroundImage source={require('./history.jpg')} />} />
                </Route>
                <Route path="/give" exact>
                  <ContributionsChartHero onViewHistory={() => this.handleOnChangeTab(2)} />
                </Route>
                <Route>
                  <Hero
                    background={
                      <Link
                        onPress={() => this.handleOnChangeTab(0)}
                        style={StyleSheet.absoluteFill}
                      >
                        <BackgroundImage source={require('./schedule-giving.jpg')} />
                      </Link>
                    }
                  />
                </Route>
              </Switch>
            </Right>
          </MediaQuery>
        </FlexedSideBySideView>
        <Switch>
          <Route path="/give/history">
            <Meta title="Giving History" />
          </Route>
          <Route path="/give" exact>
            <Meta title="Giving Dashboard" />
          </Route>
          <Route>
            <Meta title="Give" image="//s3.amazonaws.com/ns.assets/apollos/you_cant_outgive_god2x1.jpg" />
          </Route>
        </Switch>
      </BackgroundView>
    );
  }
}

export default withRouter(GiveRoutes);
