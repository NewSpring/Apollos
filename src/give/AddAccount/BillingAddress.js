import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import { BillingAddressForm } from '@ui/forms';

const BillingAddress = () => (
  <PaddedView>
    <H4>Billing Address</H4>
    <H6>Step 1 of 3</H6>
    <BillingAddressForm
      navigateToOnComplete="method"
    />
  </PaddedView>
);

export default BillingAddress;
