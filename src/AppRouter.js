import React from 'react';
import { View, Platform, Text } from 'react-native';
import { Router, Route, AndroidBackButton, Switch, Link } from '@modules/NativeWebRouter';
import CardStack from '@modules/CardStack';
import H1 from '@primitives/typography';
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
              <View style={{ paddingTop: '20%' }}>
                <H1>Example card stack! woot</H1>
                <Link to="/"><View><Text>Go to home by PUSHing home to stack (BAD!!)</Text></View></Link>
                <H1>{'\n'}</H1>
                <Link to="/" pop><View><Text>Go to home by POPing this route from stack (GOOD!!)</Text></View></Link>
              </View>
            )}
          />
          <Route component={Tabs} />
        </Container>
      </View>
    </Router>
  );
};

export default AppRouter;
