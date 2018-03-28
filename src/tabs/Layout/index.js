import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContext, compose, withState } from 'recompose';
import TabBar, { Layout, Link } from '@ui/TabBar';
import BackgroundView from '@ui/BackgroundView';
import withoutTabBar from './withoutTabBar';

const withTabBarContextProvider = compose(
  withState('hideTabBar', 'setHideTabBar'),
  withContext(
    {
      setHideTabBar: PropTypes.func,
    },
    ({ setHideTabBar } = {}) => ({
      setHideTabBar,
    }),
  ),
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
        <BackgroundView>{this.props.children}</BackgroundView>
        {!this.props.hideTabBar && (
          <TabBar>
            <Link to="/" icon="logo" label="Home" testID="homeTab" />
            <Link to="/sections" icon="sections" label="Sections" testID="sectionTab" />
            <Link to="/groups" icon="groups" label="Groups" />
            <Link to="/discover" icon="search" label="Discover" />
            <Link to="/profile" icon="profile" label="Profile" testID="profileTab" />
          </TabBar>
        )}
      </Layout>
    );
  }
}

export { withoutTabBar };
export default withTabBarContextProvider(TabBarLayout);
