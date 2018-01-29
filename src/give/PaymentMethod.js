import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import FlexedRootView from '@ui/FlexedRootView';
import PaddedView from '@ui/PaddedView';
import EditSavedPaymentMethodForm from '@ui/forms/EditSavedPaymentMethodForm';
import DeleteSavedPaymentMethodButton from '@ui/forms/DeleteSavedPaymentMethodButton';
import { compose, mapProps } from 'recompose';
import Spacer from '@ui/Spacer';

export function PaymentMethod({ id } = {}) {
  return (
    <FlexedRootView>
      <Header titleText="Payment Method" />
      <KeyboardAwareScrollView>
        <PaddedView>
          <EditSavedPaymentMethodForm id={id} />
          <Spacer />
          <DeleteSavedPaymentMethodButton id={id} />
        </PaddedView>
      </KeyboardAwareScrollView>
    </FlexedRootView>
  );
}

const enhance = compose(
  mapProps(props => ({
    id: props.match.params.id,
  })),
);

export default enhance(PaymentMethod);
