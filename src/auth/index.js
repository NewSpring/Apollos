import React from 'react';
import { compose, nest } from 'recompose';
import { Platform } from 'react-native';
import { TabViewPagerExperimental } from 'react-native-tab-view';
import Hero from '@ui/Hero';
import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import LoginForm from '@ui/forms/LoginForm';
import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import PaddedView from '@ui/PaddedView';
import SafeAreaView from '@ui/SafeAreaView';
import SignUpForm from '@ui/forms/SignUpForm';
import styled from '@ui/styled';
import TabView, { SceneMap } from '@ui/TabView';
import Video from '@ui/VideoPlayer';
import { asModal } from '@ui/ModalView';
import { H1, H3, H7 } from '@ui/typography';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';

export { default as ForgotPassword } from './ForgotPassword';
export { default as ResetPassword } from './ResetPassword';

const FixedWidthLeftSide = styled(({ theme }) => ({
  maxWidth: theme.breakpoints.sm,
  flex: 1,
  backgroundColor: '#f7f7f7',
}));

const LeftSide = compose(mediaQuery(({ md }) => ({ minWidth: md }), FixedWidthLeftSide))(Left);

const FlexedRight = styled({
  flex: 1,
})(Right);

const FlexedResponsiveSideBySideView = styled({ flex: 1 })(ResponsiveSideBySideView);
const BackgroundVideo = () => (
  <Video
    src="https://s3.amazonaws.com/ns.images/newspring/fpo/HomepageVideo_ForExport_V3-Web_Hero_2_000kbps.mp4"
    posterSource="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/hero_poster_2x1_1700_850_90_c1.jpg"
    useNativeControls={false}
    shouldPlay
    isLooping
  />
);

const enhance = compose(mediaQuery(({ md }) => ({ maxWidth: md }), asModal));

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

const Auth = enhance(({ isModal }) => (
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
          <Hero background={<BackgroundVideo />}>
            <H1>Welcome to NewSpring</H1>
          </Hero>
        </FlexedRight>
      </MediaQuery>
    )}
  </FlexedResponsiveSideBySideView>
));

export default Auth;
