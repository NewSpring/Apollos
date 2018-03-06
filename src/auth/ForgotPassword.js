import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import { asModal } from '@ui/ModalView';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';
import Header from '@ui/Header';
import PaddedView from '@ui/PaddedView';
import ForgotPasswordForm from '@ui/forms/ForgotPasswordForm';
import Hero from '@ui/Hero';
import Video from '@ui/VideoPlayer';
import { H1 } from '@ui/typography';

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

const ForgotPassword = enhance(({ isModal, webBackgroundSource, webBackgroundThumbnail }) => (
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
          <Hero
            background={
              <Video
                src={webBackgroundSource}
                posterSource={webBackgroundThumbnail}
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

export default ForgotPassword;
