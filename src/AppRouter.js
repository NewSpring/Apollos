import React from 'react';
import { View, Platform, Text } from 'react-native';
import { Router, Route, AndroidBackButton, Switch, Link } from '@modules/NativeWebRouter';
import CardStack from '@modules/CardStack';
import ModalView from '@primitives/ModalView';
import { H1 } from '@primitives/typography';
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

// todo: this should be removed as soon as example routes are gone!
const cardStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  paddingTop: '20%',
  backgroundColor: 'white',
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
              <View style={cardStyle}>
                <H1>Example card stack! woot</H1>
                <Link to="/"><View><Text>Go to home by PUSHing home to stack (BAD!!)</Text></View></Link>
                <H1>{'\n'}</H1>
                <Link to="/" pop><View><Text>Go straight to home by POPing this route from stack (GOOD!!)</Text></View></Link>
                <H1>{'\n'}</H1>
                <Link pop><View><Text>Go back one level in history</Text></View></Link>
                <H1>{'\n'}</H1>
                <Link to="/example-modal"><View><Text>Open a modal</Text></View></Link>
              </View>
            )}
          />
          <Route
            exact
            path="/example-modal"
            cardStackDirection="vertical"
            render={() => (
              <ModalView>
                <H1>Example modal! woot</H1>
                <Link pop><View><Text>Go back one level in history</Text></View></Link>
                <H1>{'\n'}</H1>
                <Link to="/example-card"><View><Text>Go to another page</Text></View></Link>
              </ModalView>
            )}
          />
          <Route component={Tabs} />
        </Container>
      </View>
    </Router>
  );
};

export default AppRouter;
