import React from 'react';
import { compose, nest } from 'recompose';
import { ScrollView } from 'react-native';
import PaddedView from '@ui/PaddedView';
import LoginForm from '@ui/forms/LoginForm';
import SignUpForm from '@ui/forms/SignUpForm';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import { asModal } from '@ui/ModalView';
import TabView, { SceneMap } from '@ui/TabView';
import styled from '@ui/styled';
import { H3, H7 } from '@ui/typography';

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
}))(PaddedView);

const asBannerText = styled(({ theme }) => ({ color: theme.colors.lightPrimary, textAlign: 'center' }));
const BannerH3 = asBannerText(H3);
const BannerH7 = asBannerText(H7);

const Auth = enhance(() => (
  <ScrollView>
    <Banner>
      <BannerH3>WELCOME TO NEWSPRING</BannerH3>
      <BannerH7>Sign In or Create your NewSpring account</BannerH7>
    </Banner>
    <TabView
      routes={tabRoutes}
      renderScene={tabSenes}
    />
  </ScrollView>
));

export default Auth;
