import React from 'react';
import PaddedView from '@ui/PaddedView';
import { PaymentForm } from '@ui/forms';
import BackgroundView from '@ui/BackgroundView';

import { Title } from '../styles';

const PaymentMethod = () => (
  <BackgroundView>
    <PaddedView>
      <Title>Payment Method</Title>
    </PaddedView>
    <PaymentForm enforceAccountName navigateToOnComplete="confirm" />
  </BackgroundView>
);

export default PaymentMethod;
