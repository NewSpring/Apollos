import React, { PureComponent } from 'react';
import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';
import {
  View,
  Platform,
} from 'react-native';
import Header from '@ui/Header';
import { H2 } from '@ui/typography';
import { matchPath, withRouter } from '@ui/NativeWebRouter';
import TabView, { SceneMap } from '@ui/TabView';
import Spacer from '@ui/Spacer';
import Label from '@ui/TabView/TabBar/Label';
import styled from '@ui/styled';
import { withTheme } from '@ui/theme';

import Dashboard from './Dashboard';
import Now from './Now';
import ContributionHistory from './ContributionHistory';

const withTabBarStyles = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
}));

const StyledTabBar = compose(
  withTheme(),
  withProps(({ theme }) => ({
    renderLabel: Label,
    indicatorStyle: {
      backgroundColor: theme.colors.primary,
    },
  })),
  withTabBarStyles,
)(TabBar);

const StyledHeader = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
}))(View);

const StyledH2 = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  paddingHorizontal: theme.sizing.baseUnit,
  color: theme.colors.darkSecondary,
}))(H2);

class GiveRoutes extends PureComponent {
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

  Header = props => (
    <StyledHeader>
      <Header titleText={this.currentRoute.headerTitle} />
      {Platform.OS === 'web' && (
        <StyledH2>{'My Giving'}</StyledH2>
      )}
      <Spacer />
      <StyledTabBar {...props} />
    </StyledHeader>
  );

  render() {
    return (
      <TabView
        initialIndex={this.currentRouteIndex}
        routes={this.routes}
        renderScene={this.scenes}
        renderHeader={this.Header}
      />
    );
  }
}

export default withRouter(GiveRoutes);
