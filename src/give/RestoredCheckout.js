import React from 'react';
import { View } from 'react-native';
import get from 'lodash/get';
import { compose } from 'recompose';
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

const enhance = compose(withoutTabBar, withRestoredGive);

export const RestoredCheckout = enhance((props) => {
  const { redirect, didGive } = parse(get(props, 'location.search', {}));

  if (didGive) {
    return (
      <PaperView>
        <H4>Giving confirmation</H4>
        <H7>{"We're redirecting you back to the NewSpring app."}</H7>
        <H7>Feel free to close this tab or checkout our website.</H7>
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
        onComplete={(error, success) => {
          props.history.replace(`${props.location.pathname}?didGive=1`);
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
