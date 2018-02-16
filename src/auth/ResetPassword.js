import React from 'react';
import { compose, pure, mapProps } from 'recompose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import ResetPasswordForm from '@ui/forms/ResetPasswordForm';
import BackgroundView from '@ui/BackgroundView';
import SideBySideView, { Right, Left } from '@ui/SideBySideView';
import PaddedView from '@ui/PaddedView';
import Hero, { BackgroundImage } from '@ui/Hero';
import MediaQuery from '@ui/MediaQuery';
import styled from '@ui/styled';

const image = 'https://s3.amazonaws.com/ns.assets/apollos/leaves.png';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const enhance = compose(
  mapProps(({ match: { params: { token } } }) => ({ token })),
  pure,
);

const ResetPassword = enhance(({ token }) => (
  <BackgroundView>
    <FlexedSideBySideView>
      <FlexedLeft>
        <Header titleText="Change Password" webEnabled />
        <KeyboardAwareScrollView enableOnAndroid>
          <PaddedView><ResetPasswordForm token={token} /></PaddedView>
        </KeyboardAwareScrollView>
      </FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <Hero background={<BackgroundImage source={image} />} />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
));

export default ResetPassword;
