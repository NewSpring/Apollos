import React from 'react';
import { ScrollView } from 'react-native';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import { ContributionForm } from '@ui/forms';

const Now = () => (
  <BackgroundView>
    <ScrollView>
      <PaddedView>
        <ContributionForm
          onComplete={({ history, savedPaymentMethods } = {}) => {
            const userHasPaymentMethods = savedPaymentMethods.length > 0;
            if (userHasPaymentMethods) {
              return history.push('/give/checkout/confirm');
            }
            return history.push('/give/checkout');
          }}
        />
      </PaddedView>
    </ScrollView>
  </BackgroundView>
);

export default Now;
