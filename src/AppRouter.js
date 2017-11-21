import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { compose, withProps, nest } from 'recompose';
import { enhancer as mediaQuery } from '@primitives/MediaQuery';
import { Router, Route, AndroidBackButton, Switch, matchPath, withRouter } from '@modules/NativeWebRouter';
import CardStack from '@modules/CardStack';
import { asModal } from '@primitives/ModalView';
import * as tabs from './tabs';

class AppRouter extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.any, // eslint-disable-line
      pathname: PropTypes.string,
    }),
    isLargeScreen: PropTypes.bool,
  }

  componentWillUpdate(nextProps) {
    if (nextProps.history.action !== 'POP' &&
        (!this.props.location.state || !this.isModal)) {
      this.previousLocation = this.props.location;
    }
  }

  get isModal() {
    return this.props.isLargeScreen &&
      this.previousLocation &&
      this.previousLocation.pathname !== this.props.location.pathname &&
      this.largeScreenModals.find(route =>
        matchPath(this.props.location.pathname, route.props.path),
      );
  }

  previousLocation = this.props.location;

  // On large screens we render modals on top of the previous route.
  // These routes should also exist elsewhere in the routing stack, which
  // are used when routed to directly (such as refreshing the page or SSR)
  // On small screens "modals" can be emulated by just rendering the route in the main
  // Route list in render() with a cardStackDrection="vertical" prop, to trigger
  // a vertical modal-style transition and swipe-down to close interaction.
  // This also allows us to create routes that exist as modals on large screens, but
  // regular pages on small screens.
  largeScreenModals = [
    <Route exact path="/sections" key="sections-modal" component={asModal(tabs.Sections)} />,
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
    // On Web we render the tab layout at this level as tabs are visible in all app routes
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
