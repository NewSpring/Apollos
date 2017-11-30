import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { compose, withProps, nest } from 'recompose';
import { enhancer as mediaQuery } from '@primitives/MediaQuery';
import { Router, Route, Redirect, AndroidBackButton, Switch, matchPath, withRouter } from '@modules/NativeWebRouter';
import CardStack from '@modules/CardStack';
import { asModal } from '@primitives/ModalView';
import DebugView from '@primitives/DebugView';

import * as tabs from './tabs';
import * as give from './give';

import Articles, { ArticlesSingle } from './articles';
import Stories, { StoriesSingle } from './stories';
import Series from './series';
import Studies from './studies';
import News, { NewsSingle } from './news';

let previousLocation;

class AppRouter extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.any, // eslint-disable-line
      pathname: PropTypes.string,
    }),
    isLargeScreen: PropTypes.bool,
  }

  componentWillMount() {
    if (!previousLocation) previousLocation = this.props.location;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.history.action !== 'POP' &&
        (!this.props.location.state || !this.isModal)
    ) {
      previousLocation = this.props.location;
    }
  }

  get isModal() {
    return this.props.isLargeScreen &&
      previousLocation &&
      previousLocation.pathname !== this.props.location.pathname &&
      this.largeScreenModals.find(route =>
        matchPath(this.props.location.pathname, route.props.path),
      );
  }

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
        <Route exact path="/give" component={give.Dashboard} />
        <Route exact path="/give/methods" component={give.PaymentMethods} />
        <Route exact path="/give/history" component={give.Transactions} />
        <Route exact path="/give/history/:id" component={give.TransactionDetails} />
        <Route exact path="/give/now" component={give.Now} />
        <Route exact path="/give/campaign/:slug" component={give.Campaign} />
        <Route exact path="/give/schedules/:id" component={give.Schedule} />
        <Route exact path="/give/thankyou" component={give.ThankYou} />
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
        <AppSwitch location={this.isModal ? previousLocation : this.props.location}>
          <Redirect from="/sermons" to="/series" />
          <Route exact path="/series" component={Series} />
          <Route exact path="/series/:id" component={DebugView} />
          <Route exact path="/series/:seriesId/sermon/:id" component={DebugView} />

          <Route exact path="/studies" component={Studies} />
          <Route exact path="/studies/:id" component={DebugView} />
          <Route exact path="/studies/:seriesId/entry/:id" component={DebugView} />

          <Redirect from="/devotionals" to="/studies" />
          <Redirect from="/devotions" to="/studies" />
          <Route exact path="/devotions/:id" component={DebugView} />

          <Route exact path="/music/:id" component={DebugView} />

          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/:id" component={ArticlesSingle} />

          <Route exact path="/stories" component={Stories} />
          <Route exact path="/stories/:id" component={StoriesSingle} />

          <Route exact path="/news" component={News} />
          <Route exact path="/news/:id" component={NewsSingle} />

          <Route exact path="/events/:id" component={DebugView} />

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
