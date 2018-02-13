import React from 'react';
import PaddedView from '@ui/PaddedView';
import BackgroundView from '@ui/BackgroundView';
import SavedPaymentReviewForm from '@ui/forms/SavedPaymentReviewForm';

import { Title } from '../styles';

const PaymentMethodConfirmation = () => (
  <BackgroundView>
    <PaddedView>
      <Title>Review</Title>
    </PaddedView>
    <SavedPaymentReviewForm
      navigateToOnComplete="done"
    />
  </BackgroundView>
);

export default PaymentMethodConfirmation;
