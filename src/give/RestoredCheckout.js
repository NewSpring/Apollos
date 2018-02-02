import React from 'react';
import {
  View,
} from 'react-native';
import get from 'lodash/get';
import {
  compose,
  branch,
  renderComponent,
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
  withoutTabBar,
  withRestoredGive,
  branch(({ isRestored }) => !isRestored, renderComponent(ActivityIndicator)),
);

export const RestoredCheckout = (props) => {
  const { redirect } = parse(get(props, 'location.search', {}));

  return (
    <PaperView>
      <H4>Secure Web Checkout</H4>
      <H7>{'Per Apple\'s charitable donations guidelines, we are forced to checkout contributors on web only'}</H7>
      <H7>{'Please review your donation'}</H7>
      <PaymentConfirmationForm
        hideChangePaymentMethodButton
        submitButtonText="Give Now"
        onComplete={(error, success) => {
          window.location.href = `${redirect}?${stringify({
            error,
            success,
          })}`;
        }}
      />
    </PaperView>
  );
};

export default enhance(RestoredCheckout);
