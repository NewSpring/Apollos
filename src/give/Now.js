import React from 'react';
import { ScrollView } from 'react-native';
import BackgroundView from '@ui/BackgroundView';
import { ContributionForm } from '@ui/forms';

import Funds from './Funds';

const Now = () => (
  <BackgroundView>
    <ScrollView>
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
    </ScrollView>
  </BackgroundView>
);

export default Now;
