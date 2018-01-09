import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4 } from '@ui/typography';
import { ChangePaymentMethodForm } from '@ui/forms';

const ChangePaymentMethod = () => (
  <PaddedView>
    <H4>Change Payment Method</H4>
    <ChangePaymentMethodForm
      onComplete={console.log}
    />
  </PaddedView>
);

export default ChangePaymentMethod;
