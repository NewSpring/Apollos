import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import { BillingAddressForm } from '@ui/forms';

const BillingAddress = () => (
  <PaddedView>
    <H4>Billing Address</H4>
    <H6>Step 2 of 4</H6>
    <BillingAddressForm navigateToOnComplete="payment" />
  </PaddedView>
);

export default BillingAddress;
