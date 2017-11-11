import React from 'react';
import { View, Platform } from 'react-native';
import { Router, Route, AndroidBackButton, Switch } from '@modules/NativeWebRouter';
import CardStack from '@modules/CardStack';
import H1 from '@primitives/H1';
import * as tabs from './tabs';

const Tabs = () => {
  const Root = Platform.OS === 'web' ? Switch : tabs.Layout;
  return (
    <Root>
      <Route exact path="/" component={tabs.Feed} />
      <Route exact path="/sections" component={tabs.Sections} />
      <Route exact path="/groups" component={tabs.Groups} />
      <Route exact path="/discover" component={tabs.Discover} />
      <Route exact path="/profile" component={tabs.Profile} />
    </Root>
  );
};

const AppRouter = () => {
  const Root = Platform.OS === 'web' ? tabs.Layout : CardStack;
  return (
    <Router>
      <View style={{ flex: 1 }}>
        {Platform.OS === 'android' ? <AndroidBackButton /> : null}
        <Root>
          <Route
            exact
            path="/example-card"
            render={() => (
              <H1>Example card stack! woot</H1>
            )}
          />
          <Route component={Tabs} />
        </Root>
      </View>
    </Router>
  );
};

export default AppRouter;
