import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import { compose, withProps, nest } from 'recompose';
import { withWindow } from '@ui/MediaQuery';
import { withTheme } from '@ui/theme';
import {
  Router,
  Route,
  ProtectedRoute,
  Redirect,
  AndroidBackButton,
  Switch,
  matchPath,
  withRouter,
  DeepLinking,
} from '@ui/NativeWebRouter';
import ActivityIndicator from '@ui/ActivityIndicator';
import CardStack from '@ui/CardStack';
import { asModal } from '@ui/ModalView';
import orientation from '@utils/orientation';
import BackgroundView from '@ui/BackgroundView';
import Meta from '@ui/Meta';
import getAppPathForUrl from '@utils/getAppPathForUrl';
import { trackScreen } from '@utils/analytics';

import * as tabs from './tabs';
import * as give from './give';

import Articles, { ArticlesSingle } from './articles';
import Stories, { StoriesSingle } from './stories';
import Series, { Sermon, SeriesSingle, SeriesTrailer } from './series';
import Studies, { StudiesSingle, StudiesEntry } from './studies';
import News, { NewsSingle } from './news';
import Music, { Playlist, Player, TrackContextual } from './music';
import Locations from './locations';
import Live from './live';
import Auth, { ForgotPassword, ResetPassword } from './auth';
import Settings, { ProfileDetails, ProfileAddress, ChangePassword } from './settings';

import { Results as GroupFinderResults, GroupSingle } from './group-finder';

const redirectToNewspring = path => window.location.replace(`https://newspring.cc/${path}`);

let previousLocation;

const universalLinksToHandle = ['newspring.cc', 'rm2y5.app.goo.gl'];
const universalLinksToFetch = ['rm2y5.app.goo.gl'];

class AppRouter extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.any, // eslint-disable-line
      pathname: PropTypes.string,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    isLargeScreen: PropTypes.bool,
  };

  constructor(...args) {
    super(...args);
    orientation.allow(orientation.Orientation.PORTRAIT_UP);
  }

  state = {
    universalLinkLoading: false,
  };

  componentWillMount() {
    this.trackScreen(this.props);
    if (!previousLocation) previousLocation = this.props.location;
  }

  componentWillUpdate(nextProps) {
    this.trackScreen(nextProps);
    if (
      nextProps.history.action !== 'POP' &&
      nextProps.history.action !== 'REPLACE' &&
      !this.isModal &&
      !this.musicPlayerIsOpened
    ) {
      previousLocation = this.props.location;
    }
  }

  get isModal() {
    return (
      this.props.isLargeScreen &&
      previousLocation &&
      previousLocation.pathname !== this.props.location.pathname &&
      this.largeScreenModals.find(route =>
        matchPath(this.props.location.pathname, route.props.path),
      )
    );
  }

  get musicPlayerIsOpened() {
    return matchPath(this.props.location.pathname, '/player');
  }

  trackScreen = ({ location, history }) => {
    if (location !== previousLocation) {
      trackScreen(location.pathname, {
        ...location,
        sizeOfHistory: history.entries ? history.entries.length : null,
      });
    }
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
    <Route path="/give/checkout" key="give-checkout" component={give.Checkout} />,
    <ProtectedRoute
      path="/give/new-payment-method"
      key="give-new-payment-method"
      component={give.AddAccount}
    />,
    <ProtectedRoute
      exact
      path="/give/payment-methods/:id"
      key="give-payment-method"
      component={give.PaymentMethod}
    />,
    <Route path="/login" key="login" component={asModal(Auth)} />,
    <Route path="/forgot-password" key="forgot-password" component={asModal(ForgotPassword)} />,
    <Route path="/discover" key="discover" component={asModal(tabs.Discover)} />,
  ];

  tabs = () => {
    // eslint-disable-line
    // On mobile we render tabs.Layout at this level so that other <Route>s at
    // the root level in the router can render on top of the tabbar
    const Layout = Platform.OS === 'web' ? BackgroundView : tabs.Layout;
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={tabs.Feed} />
          <Route exact path="/sections" component={tabs.Sections} />
          <Route exact path="/groups" component={tabs.Groups} />
          <Route exact path="/discover" component={tabs.Discover} />
          <ProtectedRoute exact path="/profile" component={tabs.Profile} />
        </Switch>
      </Layout>
    );
  };

  go = (...args) => {
    this.setState({ universalLinkLoading: false });
    this.props.history.push(...args);
  };

  handleUniversalLink = async ({ url: _url }) => {
    let url = _url;
    if (url.startsWith('exp')) url = `http${url.substr(3)}`; // handle weird expo bug
    if (universalLinksToHandle.find(link => url.includes(link))) {
      this.setState({ universalLinkLoading: true });
      try {
        let realUrl = url;
        if (universalLinksToFetch.find(link => url.includes(link))) {
          realUrl = (await fetch(url)).url;
        }

        const path = await getAppPathForUrl(realUrl);
        this.setState({ universalLinkLoading: false });
        if (path) this.props.history.push(path);
      } catch (e) {
        this.setState({ universalLinkLoading: false });
      }
    }
  };

  renderWebRedirects = () => (
    <View>
      <Route path="/about" component={() => redirectToNewspring('about')} />
      <Route path="/locations" component={() => redirectToNewspring('locations')} />
      <Route path="/sermons" component={() => redirectToNewspring('sermons')} />
      <Route path="/series" component={() => redirectToNewspring('sermons')} />
      <Route path="/devotions" component={() => redirectToNewspring('devotions')} />
      <Route path="/studies" component={() => redirectToNewspring('studies')} />
      <Route path="/music" component={() => redirectToNewspring('music')} />
      <Route path="/stories" component={() => redirectToNewspring('stories')} />
      <Route path="/events" component={() => redirectToNewspring('events')} />
      <Route path="/live" component={() => redirectToNewspring('live')} />
      <Route path="/watchandread" component={() => redirectToNewspring('watchandread')} />
      <Route path="/nextsteps" component={() => redirectToNewspring('nextsteps')} />
    </View>
  );

  render() {
    // On Web we render the tab layout at this level as tabs are visible in all app routes
    // On mobile, use a CardStack component for animated transitions and swipe to go back.
    const AppLayout = Platform.OS === 'web' ? tabs.Layout : BackgroundView;

    return (
      <BackgroundView>
        {Platform.OS === 'android' ? <AndroidBackButton /> : null}
        {Platform.OS === 'web' ? this.renderWebRedirects() : null}
        {Platform.OS !== 'web' ? (
          <DeepLinking handleUniversalLink={this.handleUniversalLink} />
        ) : null}
        <Meta />
        {this.state.universalLinkLoading ? (
          <ActivityIndicator />
        ) : (
          <Player>
            <AppLayout>
              <CardStack
                location={
                  this.isModal || this.musicPlayerIsOpened ? previousLocation : this.props.location
                }
              >
                <Redirect from="/sermons" to="/series" />
                <Route exact path="/series" component={Series} />
                <Route exact path="/series/:id" component={SeriesSingle} />
                <Route exact path="/series/:seriesId/sermon/:id" component={Sermon} />
                <Route
                  exact
                  path="/series/:id/trailer"
                  component={asModal(SeriesTrailer)}
                  cardStackDirection="vertical"
                />

                <Route exact path="/studies" component={Studies} />
                <Route exact path="/studies/:id" component={StudiesSingle} />
                <Route exact path="/studies/:seriesId/entry/:id" component={StudiesEntry} />

                <Route exact from="/devotionals/:id" component={StudiesEntry} />
                <Route exact path="/devotions/:id" component={StudiesEntry} />
                <Redirect from="/devotionals" to="/studies" />
                <Redirect from="/devotions" to="/studies" />

                <Route exact path="/music" component={Music} />
                <Route exact path="/music/:id" component={Playlist} />
                <Route
                  exact
                  path="/music/:id/:track"
                  component={TrackContextual}
                  cardStackDirection="vertical"
                />

                <Route exact path="/articles" component={Articles} />
                <Route exact path="/articles/:id" component={ArticlesSingle} />

                <Route exact path="/stories" component={Stories} />
                <Route exact path="/stories/:id" component={StoriesSingle} />

                <Route exact path="/news" component={News} />
                <Route exact path="/news/:id" component={NewsSingle} />

                <Route exact path="/groups/finder" component={GroupFinderResults} />
                <Route exact path="/groups/:id" component={GroupSingle} />

                <Route exact path="/give/campaign/:id" component={give.FundDetails} />
                <Route exact path="/give/thankyou" component={give.ThankYou} />

                <Route
                  path="/give/checkout"
                  cardStackDirection="vertical"
                  component={give.Checkout}
                />
                <ProtectedRoute
                  path="/give/new-payment-method"
                  cardStackDirection="vertical"
                  component={give.AddAccount}
                />
                <ProtectedRoute
                  exact
                  path="/give/payment-methods/:id"
                  cardStackDirection="vertical"
                  component={give.PaymentMethod}
                />

                <Route exact path="/give/restored-checkout" component={give.RestoredCheckout} />
                <ProtectedRoute
                  exact
                  path="/give/history/:id"
                  component={give.TransactionDetails}
                />
                <ProtectedRoute exact path="/give/schedules/:id" component={give.ScheduleDetails} />

                <Route path="/give" component={give.GiveRoutes} />

                <Route path="/locations" component={Locations} />

                <Route path="/login" component={Auth} cardStackDirection="vertical" />

                <Route exact path="/live" component={asModal(Live)} cardStackDirection="vertical" />
                <ProtectedRoute exact path="/settings" component={Settings} />
                <ProtectedRoute exact path="/settings/profile" component={ProfileDetails} />
                <ProtectedRoute exact path="/settings/address" component={ProfileAddress} />
                <ProtectedRoute exact path="/settings/password" component={ChangePassword} />

                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                  cardStackDirection="vertical"
                />
                <Route exact path="/_/reset-password/:token" component={ResetPassword} />

                <Route cardStackKey="tabs" component={this.tabs} />
              </CardStack>
            </AppLayout>
            <Switch>{this.isModal ? this.largeScreenModals : null}</Switch>
          </Player>
        )}
      </BackgroundView>
    );
  }
}

const enhance = compose(
  withRouter,
  withWindow,
  withTheme(),
  withProps(({ theme, window }) => ({
    isLargeScreen: window.width > theme.breakpoints.md,
  })),
);

export default nest(Router, enhance(AppRouter));
