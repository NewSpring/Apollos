import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import ForgotPasswordForm from '@ui/forms/ForgotPasswordForm';
import BackgroundView from '@ui/BackgroundView';
import ModalView from '@ui/ModalView';
import PaddedView from '@ui/PaddedView';

const ForgotPassword = () => (
  <ModalView>
    <BackgroundView>
      <Header titleText="Forgot Password" webEnabled />
      <KeyboardAwareScrollView enableOnAndroid>
        <PaddedView><ForgotPasswordForm /></PaddedView>
      </KeyboardAwareScrollView>
    </BackgroundView>
  </ModalView>
);

export default ForgotPassword;
