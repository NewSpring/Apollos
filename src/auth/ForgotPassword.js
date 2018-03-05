import React from 'react';
import { compose } from 'recompose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import Hero from '@ui/Hero';
import ForgotPasswordForm from '@ui/forms/ForgotPasswordForm';
import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
import Video from '@ui/VideoPlayer';
import { asModal } from '@ui/ModalView';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';
import { H1 } from '@ui/typography';

const FixedWidthLeftSide = styled(({ theme }) => ({
  maxWidth: theme.breakpoints.sm,
  flex: 1,
  backgroundColor: theme.colors.background.default,
}));

const Flexed = styled({
  flex: 1,
});

const LeftSide = compose(mediaQuery(({ md }) => ({ minWidth: md }), FixedWidthLeftSide, Flexed))(
  Left,
);

const FlexedRight = Flexed(Right);

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

const ForgotPassword = enhance(({ isModal }) => (
  <FlexedResponsiveSideBySideView>
    <LeftSide>
      <Header titleText="Forgot Password" webEnabled />
      <KeyboardAwareScrollView enableOnAndroid>
        <PaddedView>
          <ForgotPasswordForm />
        </PaddedView>
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

export default ForgotPassword;
