import React from 'react';
import PaddedView from '@ui/PaddedView';
import { ChangePaymentMethodForm } from '@ui/forms';
import BackgroundView from '@ui/BackgroundView';

import { Title } from './styles';

const ChangePaymentMethod = () => (
  <BackgroundView>
    <PaddedView>
      <Title>Change Payment Method</Title>
    </PaddedView>
    <ChangePaymentMethodForm />
  </BackgroundView>
);

export default ChangePaymentMethod;
