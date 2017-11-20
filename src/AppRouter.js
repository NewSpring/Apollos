import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import { compose, withProps, nest } from 'recompose';
import { enhancer as mediaQuery } from '@primitives/MediaQuery';
import { Router, Route, AndroidBackButton, Switch, matchPath, withRouter } from '@modules/NativeWebRouter';
import CardStack from '@modules/CardStack';
import * as tabs from './tabs';

class AppRouter extends PureComponent {
  componentWillUpdate(nextProps) {
    if (nextProps.history.action !== 'POP' &&
        (!this.props.location.state || !this.isModal)) {
      this.previousLocation = this.props.location;
    }
  }

  get isModal() {
    return this.props.isLargeScreen &&
      this.previousLocation &&
      this.previousLocation !== this.props.location &&
      this.largeScreenModals.find(route => matchPath(this.props.location.pathname, route.props.path));
  }

  previousLocation = this.props.location;

  // On large screens we render modals on top of the previous route
  // These routes should also exist elsewhere in the routing stack -
  // And are used on fresh page loads or on mobile.
  largeScreenModals = [
    <Route exact path="/sections" key="sections-modal" component={tabs.Sections} />,
  ];

  tabs = () => {
    // On mobile we render tabs.Layout at this level so that other <Route>s at
    // the root level in the router can render on top of the tabbar
    const TabSwitch = Platform.OS === 'web' ? Switch : tabs.Layout;
    return (
      <TabSwitch>
        <Route exact path="/" component={tabs.Feed} />
        <Route exact path="/sections" component={tabs.Sections} />
        <Route exact path="/groups" component={tabs.Groups} />
        <Route exact path="/discover" component={tabs.Discover} />
        <Route exact path="/profile" component={tabs.Profile} />
      </TabSwitch>
    );
  };

  render() {
    // On Web we render the tab layout at this level as it is always visible.
    // On mobile, use a CardStack component for animated transitions and swipe to go back.
    const AppSwitch = Platform.OS === 'web' ? tabs.Layout : CardStack;
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === 'android' ? <AndroidBackButton /> : null}
        <AppSwitch location={this.isModal ? this.previousLocation : this.props.location}>
          <Route component={this.tabs} />
        </AppSwitch>
        {this.isModal ? this.largeScreenModals : null}
      </View>
    );
  }
}

const enhance = compose(
  withRouter,
  mediaQuery(({ md }) => ({ minWidth: md }), withProps(() => ({ isLargeScreen: true }))),
);

export default nest(Router, enhance(AppRouter));
