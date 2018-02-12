import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackgroundView from '@ui/BackgroundView';
import { ContributionForm } from '@ui/forms';

import Funds from './Funds';

const Now = () => (
  <BackgroundView>
    <KeyboardAwareScrollView enableOnAndroid>
      <ContributionForm
        onComplete={({ history, savedPaymentMethods } = {}) => {
          const userHasPaymentMethods = savedPaymentMethods.length > 0;
          if (userHasPaymentMethods) {
            return history.push('/give/checkout/confirm');
          }
          return history.push('/give/checkout');
        }}
      />
      <Funds />
    </KeyboardAwareScrollView>
  </BackgroundView>
);

export default Now;
