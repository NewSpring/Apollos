import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import BillingAddressForm from '@ui/forms/BillingAddressForm';
import PaymentForm from '@ui/forms/PaymentForm';
import SavedPaymentReviewForm from '@ui/forms/SavedPaymentReviewForm';

export default function Dashboard() {
  return (
    <FlexedView>
      <Header titleText="Give Dashboard" />
      <ScrollView>
        <PaddedView>
          <Text>{'Dashboard (add account)'}</Text>
          <BillingAddressForm />
          <PaymentForm
            enforceAccountName
          />
          <SavedPaymentReviewForm />
        </PaddedView>
      </ScrollView>
    </FlexedView>
  );
}
