import React, { PureComponent } from 'react';
import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';
import {
  View,
} from 'react-native';
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
  get initialIndex() {
    // eslint-disable-next-line
    return this.routes.findIndex(route => (matchPath(this.props.location.pathname, {
      path: route.path,
      exact: true,
    })));
  }

  scenes = SceneMap({
    Dashboard,
    Now,
    ContributionHistory,
  });

  routes = [
    { title: 'Dashboard', key: 'Dashboard', path: '/give' },
    { title: 'Now', key: 'Now', path: '/give/now' },
    { title: 'History', key: 'ContributionHistory', path: '/give/history' },
  ];

  // eslint-disable-next-line
  Header = (props) => {
    return (
      <StyledHeader>
        <StyledH2>{'My Giving'}</StyledH2>
        <Spacer />
        <StyledTabBar {...props} />
      </StyledHeader>
    );
  }

  render() {
    return (
      <TabView
        initialIndex={this.initialIndex}
        routes={this.routes}
        renderScene={this.scenes}
        renderHeader={this.Header}
      />
    );
  }
}

export default withRouter(GiveRoutes);
