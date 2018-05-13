import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import {
  withContext,
  compose,
  withState,
} from 'recompose';
import TabBar, { Layout, Link } from '@ui/TabBar';
import BackgroundView from '@ui/BackgroundView';
import withoutTabBar from './withoutTabBar';

const withTabBarContextProvider = compose(
  withState('hideTabBar', 'setHideTabBar'),
  withContext({
    setHideTabBar: PropTypes.func,
  }, ({ setHideTabBar } = {}) => ({
    setHideTabBar,
  })),
);

class TabBarLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    hideTabBar: PropTypes.bool,
  };

  static withoutTabBar = withoutTabBar;

  render() {
    return (
      <Layout>
        <BackgroundView>
          {this.props.children}
        </BackgroundView>
        {!this.props.hideTabBar && (
          <TabBar>
            <Link to={Platform.OS === 'web' ? '/give/now' : '/'} icon="logo" label="Home" />
            <Link to="/sections" icon="sections" label="Sections" />
            <Link to="/groups" icon="groups" label="Groups" />
            <Link to="/discover" icon="search" label="Discover" />
            <Link to="/profile" icon="profile" label="Profile" />
          </TabBar>
        )}
      </Layout>
    );
  }
}

export { withoutTabBar };
export default withTabBarContextProvider(TabBarLayout);
