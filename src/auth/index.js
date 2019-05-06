import React from 'react';
import { compose, pure, setPropTypes, nest } from 'recompose';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { TabViewPagerExperimental } from 'react-native-tab-view';
import react-native-gesture-handler

import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import { asModal } from '@ui/ModalView';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';
import PaddedView from '@ui/PaddedView';
import LoginForm from '@ui/forms/LoginForm';
import SignUpForm from '@ui/forms/SignUpForm';
import SafeAreaView from '@ui/SafeAreaView';
import { H1, H3, H7 } from '@ui/typography';
import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import TabView, { SceneMap } from '@ui/TabView';
import Hero from '@ui/Hero';
import Video from '@ui/VideoPlayer';

export { default as ForgotPassword } from './ForgotPassword';
export { default as ResetPassword } from './ResetPassword';

const enhance = compose(
  pure,
  setPropTypes({
    webBackgroundSource: PropTypes.string,
    webBackgroundThumbnail: PropTypes.string,
    isModal: PropTypes.bool,
  }),
  mediaQuery(({ md }) => ({ maxWidth: md }), asModal),
  withTheme(({ theme: { web: { backgroundVideo, backgroundVideoThumbnail = {} } = {} } = {} }) => ({
    webBackgroundSource: backgroundVideo,
    webBackgroundThumbnail: backgroundVideoThumbnail,
  })),
);

const flexed = styled({
  flex: 1,
});
const FlexedResponsiveSideBySideView = flexed(ResponsiveSideBySideView);
const FlexedRight = flexed(Right);

const fixedWidthLeftSide = styled(({ theme }) => ({
  maxWidth: theme.breakpoints.sm,
  flex: 1,
  backgroundColor: theme.colors.background.default,
}));
const LeftSide = compose(mediaQuery(({ md }) => ({ minWidth: md }), fixedWidthLeftSide, flexed))(
  Left,
);

const tabScenes = SceneMap({
  login: nest(PaddedView, LoginForm),
  signup: nest(PaddedView, SignUpForm),
});

const tabRoutes = [{ title: 'Sign In', key: 'login' }, { title: 'Register', key: 'signup' }];

const Banner = styled(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.primary,
  ...Platform.select({
    android: {
      paddingTop: 20, // compensate for status bar
    },
  }),
}))(SafeAreaView);

const BannerContent = styled({ alignItems: 'center' })(PaddedView);

const renderPager = props => <TabViewPagerExperimental {...props} />;

const asBannerText = styled(({ theme }) => ({
  color: theme.colors.lightPrimary,
  textAlign: 'center',
}));
const BannerH3 = asBannerText(H3);
const BannerH7 = asBannerText(H7);

const Auth = enhance(({ isModal, webBackgroundSource, webBackgroundThumbnail }) => (
  <FlexedResponsiveSideBySideView>
    <LeftSide>
      <KeyboardAwareScrollView>
        <Banner>
          <BannerContent>
            <BannerH3>WELCOME TO NEWSPRING</BannerH3>
            <BannerH7>Sign In or Create your NewSpring account</BannerH7>
          </BannerContent>
        </Banner>
        <TabView
          renderPager={Platform.OS === 'android' ? renderPager : undefined}
          routes={tabRoutes}
          renderScene={tabScenes}
        />
      </KeyboardAwareScrollView>
    </LeftSide>
    {isModal ? null : (
      <MediaQuery minWidth={'md'}>
        <FlexedRight>
          <Hero
            background={
              <Video
                src={webBackgroundSource}
                posterSrc={webBackgroundThumbnail}
                useNativeControls={false}
                shouldPlay
                isLooping
              />
            }
          >
            <H1>Welcome to NewSpring</H1>
          </Hero>
        </FlexedRight>
      </MediaQuery>
    )}
  </FlexedResponsiveSideBySideView>
));

export default Auth;
