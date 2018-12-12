import React from 'react';
import { View } from 'react-native';
import get from 'lodash/get';
import {
  compose,
  mapProps,
  pure,
} from 'recompose';
import { H4, H7 } from '@ui/typography';
import { parse, stringify } from '@utils/queryString';
import ActivityIndicator from '@ui/ActivityIndicator';
import withRestoredGive from '@data/withRestoredGive';
import { PaymentConfirmationForm } from '@ui/forms';
import styled from '@ui/styled';
import { withoutTabBar } from 'tabs/Layout';

const PaperView = styled(
  ({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background.paper,
    padding: theme.sizing.baseUnit,
  }),
  'PaperView',
)(View);

const enhance = compose(
  mapProps(() => ({})),
  pure,
  withoutTabBar,
  withRestoredGive,
);

export const RestoredCheckout = enhance((props) => {
  const {
    redirect, didGive, error, success,
  } = parse(get(props, 'location.search', {}));

  if (didGive) {
    if (redirect) {
      window.location.href = `${redirect}?${stringify({
        error,
        success,
      })}`;
    }

    return (
      <PaperView>
        <H4>Giving confirmation</H4>
        <H7>{"We're redirecting you back to the NewSpring app."}</H7>
        <H7>If you come back to this screen later, feel free to close this tab.</H7>
      </PaperView>
    );
  }

  if (!props.isRestored) {
    return <ActivityIndicator />;
  }

  return (
    <PaperView>
      <H4>Secure Web Checkout</H4>
      <H7>{'Please review your donation'}</H7>
      <PaymentConfirmationForm
        hideChangePaymentMethodButton
        fromIos
        onComplete={(completionError, completionSuccess) => {
          props.history.replace(`${props.location.pathname}?${stringify({
            error: completionError,
            success: completionSuccess,
            didGive: 1,
            redirect,
          })}`);
        }}
      />
    </PaperView>
  );
});

export default RestoredCheckout;
