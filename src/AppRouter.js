import React from 'react';
import { View, Platform } from 'react-native';
import { Router, Route, AndroidBackButton, Switch } from '@modules/NativeWebRouter';
import CardStack from '@modules/CardStack';
import H1 from '@primitives/typography/H1';
import * as tabs from './tabs';

const Tabs = () => {
  // On mobile we render the tab layout at this level so that other <Route>s at
  // the root level in the router can replace the tabbar
  const Container = Platform.OS === 'web' ? Switch : tabs.Layout;
  return (
    <Container>
      <Route exact path="/" component={tabs.Feed} />
      <Route exact path="/sections" component={tabs.Sections} />
      <Route exact path="/groups" component={tabs.Groups} />
      <Route exact path="/discover" component={tabs.Discover} />
      <Route exact path="/profile" component={tabs.Profile} />
    </Container>
  );
};

const AppRouter = () => {
  // On Web we render the tab layout at this level as it is always visible.
  // On mobile, use a CardStack component for animated transitions and swipe to go back.
  const Container = Platform.OS === 'web' ? tabs.Layout : CardStack;
  return (
    <Router>
      <View style={{ flex: 1 }}>
        {Platform.OS === 'android' ? <AndroidBackButton /> : null}
        <Container>
          <Route
            exact
            path="/example-card"
            render={() => (
              <H1>Example card stack! woot</H1>
            )}
          />
          <Route component={Tabs} />
        </Container>
      </View>
    </Router>
  );
};

export default AppRouter;
