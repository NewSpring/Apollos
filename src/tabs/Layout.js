import React from 'react';
import PropTypes from 'prop-types';
import TabBar, { Layout, Link } from '@ui/TabBar';
import FlexedRootView from '@ui/FlexedRootView';

const TabBarLayout = ({ children }) => (
  <Layout>
    <FlexedRootView>
      {children}
    </FlexedRootView>
    <TabBar>
      <Link to="/" icon="logo" label="Home" />
      <Link to="/sections" icon="sections" label="Sections" />
      <Link to="/groups" icon="groups" label="Groups" />
      <Link to="/discover" icon="search" label="Discover" />
      <Link to="/profile" icon="profile" label="Profile" />
    </TabBar>
  </Layout>
);

TabBarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabBarLayout;
