import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import { PaymentForm } from '@ui/forms';

const PaymentMethod = () => (
  <PaddedView>
    <H4>Payment Method</H4>
    <H6>Step 2 of 3</H6>
    <PaymentForm
      enforceAccountName
      navigateToOnComplete="confirm"
    />
  </PaddedView>
);

export default PaymentMethod;
