import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import EditSavedPaymentMethodForm from '@ui/forms/EditSavedPaymentMethodForm';
import { compose, mapProps } from 'recompose';

import { Title } from './styles';

export function PaymentMethod({ id } = {}) {
  return (
    <BackgroundView>
      <Header titleText="Payment Method" />
      <KeyboardAwareScrollView enableOnAndroid>
        <PaddedView>
          <Title>Edit Account</Title>
        </PaddedView>
        <EditSavedPaymentMethodForm id={id} />
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
