import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import EditSavedPaymentMethodForm from '@ui/forms/EditSavedPaymentMethodForm';

export function PaymentMethod() {
  return (
    <FlexedView>
      <Header titleText="Payment Method" />
      <KeyboardAwareScrollView>
        <PaddedView>
          <EditSavedPaymentMethodForm />
        </PaddedView>
      </KeyboardAwareScrollView>
    </FlexedView>
  );
}

export default PaymentMethod;
