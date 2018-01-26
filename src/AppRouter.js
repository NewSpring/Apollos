import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { compose, withProps, nest } from 'recompose';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import { Router, Route, ProtectedRoute, Redirect, AndroidBackButton, Switch, matchPath, withRouter } from '@ui/NativeWebRouter';
import CardStack from '@ui/CardStack';
import { asModal } from '@ui/ModalView';
import DebugView from '@ui/DebugView';
import FlexedView from '@ui/FlexedView';

import * as tabs from './tabs';
import * as give from './give';

import Articles, { ArticlesSingle } from './articles';
import Stories, { StoriesSingle } from './stories';
import Series, { Sermon, SeriesSingle, SeriesTrailer } from './series';
import Studies, { StudiesSingle, StudiesEntry } from './studies';
import News, { NewsSingle } from './news';
import Music, { Playlist, Player, TrackContextual } from './music';
import Auth from './auth';
import Settings from './settings';

import { Results as GroupFinderResults, GroupSingle } from './group-finder';

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
    if ((nextProps.history.action !== 'POP' &&
        nextProps.history.action !== 'REPLACE') &&
        !this.isModal &&
        !this.musicPlayerIsOpened
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

  get musicPlayerIsOpened() {
    return matchPath(this.props.location.pathname, '/player');
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
    <Route path="/give/checkout" key="give-checkout" component={asModal(give.Checkout)} />,
    <Route path="/give/new-payment-method" key="give-new-payment-method" component={asModal(give.AddAccount)} />,
    <Route path="/give/payment-methods/:id" key="give-payment-method" component={asModal(give.PaymentMethod)} />,
    <Route path="/login" key="login" component={asModal(Auth)} />,
  ];

  tabs = () => { // eslint-disable-line
    // On mobile we render tabs.Layout at this level so that other <Route>s at
    // the root level in the router can render on top of the tabbar
    const Layout = Platform.OS === 'web' ? FlexedView : tabs.Layout;
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={tabs.Feed} />
          <Route exact path="/sections" component={tabs.Sections} />
          <Route exact path="/groups" component={tabs.Groups} />
          <Route exact path="/discover" component={tabs.Discover} />
          <ProtectedRoute exact path="/profile" component={tabs.Profile} />

          <Route exact path="/give" component={give.Dashboard} />
          <Route exact path="/give/methods" component={give.PaymentMethods} />
          <Route exact path="/give/history" component={give.Transactions} />
          <Route exact path="/give/history/:id" component={give.TransactionDetails} />
          <Route exact path="/give/now" component={give.Now} />
          <Route exact path="/give/campaign/:slug" component={give.Campaign} />
          <Route exact path="/give/schedules/:id" component={give.Schedule} />
          <Route exact path="/give/thankyou" component={give.ThankYou} />
        </Switch>
      </Layout>
    );
  };

  render() {
    // On Web we render the tab layout at this level as tabs are visible in all app routes
    // On mobile, use a CardStack component for animated transitions and swipe to go back.
    const AppLayout = Platform.OS === 'web' ? tabs.Layout : FlexedView;
    return (
      <FlexedView>
        {Platform.OS === 'android' ? <AndroidBackButton /> : null}
        <Player>
          <AppLayout>
            <CardStack
              location={(this.isModal || this.musicPlayerIsOpened) ?
                previousLocation : this.props.location
              }
            >
              <Redirect from="/sermons" to="/series" />
              <Route exact path="/series" component={Series} />
              <Route exact path="/series/:id" component={SeriesSingle} />
              <Route exact path="/series/:seriesId/sermon/:id" component={Sermon} />

              <Route exact path="/studies" component={Studies} />
              <Route exact path="/studies/:id" component={StudiesSingle} />
              <Route exact path="/studies/:seriesId/entry/:id" component={StudiesEntry} />

              <Redirect from="/devotionals" to="/studies" />
              <Redirect from="/devotions" to="/studies" />
              <Route exact path="/devotions/:id" component={DebugView} />

              <Route exact path="/music" component={Music} />
              <Route exact path="/music/:id" component={Playlist} />

              <Route exact path="/articles" component={Articles} />
              <Route exact path="/articles/:id" component={ArticlesSingle} />

              <Route exact path="/stories" component={Stories} />
              <Route exact path="/stories/:id" component={StoriesSingle} />

              <Route exact path="/news" component={News} />
              <Route exact path="/news/:id" component={NewsSingle} />

              <Route exact path="/events/:id" component={DebugView} />

              <Route exact path="/groups/finder" component={GroupFinderResults} />
              <Route exact path="/groups/:id" component={GroupSingle} />

              <Route path="/give/checkout" cardStackDirection="vertical" component={give.Checkout} />
              <Route path="/give/new-payment-method" cardStackDirection="vertical" component={give.AddAccount} />
              <Route path="/give/payment-methods/:id" cardStackDirection="vertical" component={give.PaymentMethod} />

              <Route path="/login" cardStackDirection="vertical" component={Auth} />
              <ProtectedRoute exact path="/settings" component={Settings} />

              <Route cardStackKey="tabs" component={this.tabs} />
            </CardStack>
          </AppLayout>
          {this.isModal ? this.largeScreenModals : null}
        </Player>
      </FlexedView>
    );
  }
}

const enhance = compose(
  withRouter,
  mediaQuery(({ md }) => ({ minWidth: md }), withProps(() => ({ isLargeScreen: true }))),
);

export default nest(Router, enhance(AppRouter));
