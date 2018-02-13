import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { compose, mapProps } from 'recompose';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import EditSavedPaymentMethodForm from '@ui/forms/EditSavedPaymentMethodForm';
import ModalView from '@ui/ModalView';

import { Title } from './styles';

export function PaymentMethod({ id } = {}) {
  return (
    <ModalView backTo="/give/now" onBackReplace>
      <BackgroundView>
        <Header titleText="Payment Method" />
        <KeyboardAwareScrollView enableOnAndroid>
          <PaddedView>
            <Title>Edit Account</Title>
          </PaddedView>
          <EditSavedPaymentMethodForm id={id} />
        </KeyboardAwareScrollView>
      </BackgroundView>
    </ModalView>
  );
}

const enhance = compose(
  mapProps(props => ({
    id: props.match.params.id,
  })),
);

export default enhance(PaymentMethod);
