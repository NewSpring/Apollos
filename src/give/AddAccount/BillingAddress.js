import React from 'react';
import PaddedView from '@ui/PaddedView';
import { BillingAddressForm } from '@ui/forms';
import BackgroundView from '@ui/BackgroundView';

import { Title } from '../styles';

const BillingAddress = () => (
  <BackgroundView>
    <PaddedView>
      <Title>Billing Address</Title>
    </PaddedView>
    <BillingAddressForm navigateToOnComplete="method" />
  </BackgroundView>
);

export default BillingAddress;
