import React from 'react';
import PaddedView from '@ui/PaddedView';
import { PaymentForm } from '@ui/forms';
import BackgroundView from '@ui/BackgroundView';

import { Title } from './styles';

const Payment = () => (
  <BackgroundView>
    <PaddedView>
      <Title>Payment Details</Title>
    </PaddedView>
    <PaymentForm navigateToOnComplete="confirm" />
  </BackgroundView>
);

export default Payment;
