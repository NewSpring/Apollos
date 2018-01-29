import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import EditSavedPaymentMethodForm from '@ui/forms/EditSavedPaymentMethodForm';
import DeleteSavedPaymentMethodButton from '@ui/forms/DeleteSavedPaymentMethodButton';
import { compose, mapProps } from 'recompose';
import Spacer from '@ui/Spacer';

export function PaymentMethod({ id } = {}) {
  return (
    <BackgroundView>
      <Header titleText="Payment Method" />
      <KeyboardAwareScrollView>
        <PaddedView>
          <EditSavedPaymentMethodForm id={id} />
          <Spacer />
          <DeleteSavedPaymentMethodButton id={id} />
        </PaddedView>
      </KeyboardAwareScrollView>
    </BackgroundView>
  );
}

const enhance = compose(
  mapProps(props => ({
    id: props.match.params.id,
  })),
);

export default enhance(PaymentMethod);
