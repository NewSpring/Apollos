import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import { PaymentConfirmationForm } from '@ui/forms';

const PaymentConfirmation = () => (
  <PaddedView>
    <H4>Payment Confirmation</H4>
    <H6>Step 4 of 4</H6>
    <PaymentConfirmationForm navigateToOnComplete="complete" navigateToOnBack="payment" />
  </PaddedView>
);

export default PaymentConfirmation;
