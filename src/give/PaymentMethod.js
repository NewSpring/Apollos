import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import EditSavedPaymentMethodForm from '@ui/forms/EditSavedPaymentMethodForm';
import DeleteSavedPaymentMethodButton from '@ui/forms/DeleteSavedPaymentMethodButton';
import { compose, mapProps } from 'recompose';
import Spacer from '@ui/Spacer';

export function PaymentMethod({ id } = {}) {
  return (
    <FlexedView>
      <Header titleText="Payment Method" />
      <KeyboardAwareScrollView>
        <PaddedView>
          <EditSavedPaymentMethodForm id={id} />
          <Spacer />
          <DeleteSavedPaymentMethodButton id={id} />
        </PaddedView>
      </KeyboardAwareScrollView>
    </FlexedView>
  );
}

const enhance = compose(
  mapProps(props => ({
    id: props.match.params.id,
  })),
);

export default enhance(PaymentMethod);
