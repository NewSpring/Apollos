import React from 'react';
import { View, Platform } from 'react-native';
import { Router, Route, AndroidBackButton, Switch } from './@modules/NativeWebRouter';

import * as tabs from './tabs';
import TabBar, { Link as TabBarLink } from './@modules/TabBar';

const Tabs = () => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Switch>
        <Route exact path="/" component={tabs.Feed} />
        <Route exact path="/sections" component={tabs.Sections} />
        <Route exact path="/groups" component={tabs.Groups} />
        <Route exact path="/discover" component={tabs.Discover} />
        <Route exact path="/profile" component={tabs.Profile} />
      </Switch>
    </View>
    <TabBar>
      <TabBarLink to="/" icon="logo" label="Home" />
      <TabBarLink to="/sections" icon="sections" label="Sections" />
      <TabBarLink to="/groups" icon="groups" label="Groups" />
      <TabBarLink to="/discover" icon="search" label="Discover" />
      <TabBarLink to="/profile" icon="profile" label="Profile" />
    </TabBar>
  </View>
);

export default () => (
  <Router>
    <View style={{ flex: 1 }}>
      {Platform.OS === 'android' ? <AndroidBackButton /> : null}
      <Route component={Tabs} />
    </View>
  </Router>
);
