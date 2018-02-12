import React from 'react';
import { compose, nest } from 'recompose';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TabViewPagerExperimental } from 'react-native-tab-view';
import SafeAreaView from '@ui/SafeAreaView';
import PaddedView from '@ui/PaddedView';
import LoginForm from '@ui/forms/LoginForm';
import SignUpForm from '@ui/forms/SignUpForm';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import { asModal } from '@ui/ModalView';
import TabView, { SceneMap } from '@ui/TabView';
import styled from '@ui/styled';
import { H3, H7 } from '@ui/typography';

export { default as ForgotPassword } from './ForgotPassword';
export { default as ResetPassword } from './ResetPassword';

const enhance = compose(
  mediaQuery(({ md }) => ({ maxWidth: md }), asModal),
);

const tabSenes = SceneMap({
  login: nest(PaddedView, LoginForm),
  signup: nest(PaddedView, SignUpForm),
});

const tabRoutes = [
  { title: 'Sign In', key: 'login' },
  { title: 'Register', key: 'signup' },
];

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

const asBannerText = styled(({ theme }) => ({ color: theme.colors.lightPrimary, textAlign: 'center' }));
const BannerH3 = asBannerText(H3);
const BannerH7 = asBannerText(H7);

const Auth = enhance(() => (
  <KeyboardAwareScrollView enableOnAndroid>
    <Banner>
      <BannerContent>
        <BannerH3>WELCOME TO NEWSPRING</BannerH3>
        <BannerH7>Sign In or Create your NewSpring account</BannerH7>
      </BannerContent>
    </Banner>
    <TabView
      renderPager={Platform.OS === 'android' ? renderPager : undefined}
      routes={tabRoutes}
      renderScene={tabSenes}
    />
  </KeyboardAwareScrollView>
));

export default Auth;
