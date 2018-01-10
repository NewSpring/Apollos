import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch, Route, Redirect, withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import Progress from '@ui/Progress';

import PersonalDetails from './PersonalDetails';
import BillingAddress from './BillingAddress';
import Payment from './Payment';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentComplete from './PaymentComplete';
import ChangePaymentMethod from './ChangePaymentMethod';

function lastDirectory(pathname) {
  const pathParts = pathname.split('/');
  return pathParts.slice(pathParts.length - 1)[0];
}

const progressForLocation = ({ pathname }) => {
  let step = 0;
  const directory = lastDirectory(pathname);
  if (directory === 'complete') step = 5;
  if (directory === 'confirm') step = 4;
  if (directory === 'payment') step = 3;
  if (directory === 'address') step = 2;
  if (directory === 'personal') step = 1;
  if (directory === 'change-payment-method') step = 4;
  return step / 5; // 5 steps == start the user with progress
};

const Checkout = withRouter(({ match, location }) => (
  <FlexedView>
    <Header titleText="My Giving" backButton />
    <Progress progress={progressForLocation(location)} />
    <KeyboardAwareScrollView>
      <Switch>
        <Route path={`${match.url}/personal`} component={PersonalDetails} />
        <Route path={`${match.url}/address`} component={BillingAddress} />
        <Route exact path={`${match.url}/payment`} component={Payment} />
        <Route exact path={`${match.url}/confirm`} component={PaymentConfirmation} />
        <Route exact path={`${match.url}/complete`} component={PaymentComplete} />
        <Route exact path={`${match.url}/change-payment-method`} component={ChangePaymentMethod} />
        <Redirect to={`${match.url}/personal`} />
      </Switch>
    </KeyboardAwareScrollView>
  </FlexedView>
));

export default Checkout;
