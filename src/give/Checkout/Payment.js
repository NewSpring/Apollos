import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import { PaymentForm } from '@ui/forms';

const Payment = () => (
  <PaddedView>
    <H4>Billing Address</H4>
    <H6>Step 3 of 4</H6>
    <PaymentForm navigateToOnComplete="confirm" />
  </PaddedView>
);

export default Payment;
