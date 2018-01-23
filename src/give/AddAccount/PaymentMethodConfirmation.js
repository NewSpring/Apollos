import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import SavedPaymentReviewForm from '@ui/forms/SavedPaymentReviewForm';

const PaymentMethodConfirmation = () => (
  <PaddedView>
    <H4>Review</H4>
    <H6>Step 3 of 3</H6>
    <SavedPaymentReviewForm
      navigateToOnComplete="done"
    />
  </PaddedView>
);

export default PaymentMethodConfirmation;
