/* eslint-disable */
import React from 'react';
import { View } from 'react-native';
import get from 'lodash/get';
import {
  compose,
  branch,
  withState,
  renderComponent,
  mapProps,
  pure,
} from 'recompose';
import { H4, H7 } from '@ui/typography';
import ActivityIndicator from '@ui/ActivityIndicator';
import { parse, stringify } from '@utils/queryString';
import withRestoredGive from '@data/withRestoredGive';
import { PaymentConfirmationForm } from '@ui/forms';
import styled from '@ui/styled';
import { withoutTabBar } from 'tabs/Layout';

const PaperView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.paper,
  padding: theme.sizing.baseUnit,
}), 'PaperView')(View);

const enhance = compose(
  mapProps(() => ({})),
  pure,
  withoutTabBar,
  withRestoredGive,
  withState('paymentCompletion', 'setPaymentCompletion', false),
  branch(
    ({ isRestored, contributions }) => !isRestored || !contributions,
    renderComponent(ActivityIndicator),
  ),
);

export const RestoredCheckout = enhance((props) => {
  const { redirect } = parse(get(props, 'location.search', {}));

  if (props.paymentCompletion) {
    return (
      <PaperView>
        <H4>
          {(!props.paymentCompletion.error && props.paymentCompletion.success) ? (
            'Looking good!'
          ) : (
            'Hmm...there might be a problem.'
          )}
        </H4>
        <H7>Redirecting you back to the NewSpring app...</H7>
        <ActivityIndicator />
      </PaperView>
    );
  }

  return (
    <PaperView>
      <H4>Secure Web Checkout</H4>
      <H7>{'Please review your donation'}</H7>
      <PaymentConfirmationForm
        hideChangePaymentMethodButton
        onComplete={(error, success) => {
          props.setPaymentCompletion({ error, success });
          window.location.href = `${redirect}?${stringify({
            error,
            success,
          })}`;
        }}
      />
    </PaperView>
  );
});

export default RestoredCheckout;
