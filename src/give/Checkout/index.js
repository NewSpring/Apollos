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

const progressForLocation = ({ pathname }) => {
  let step = 0;
  if (pathname.includes('complete')) step = 5;
  if (pathname.includes('confirm')) step = 4;
  if (pathname.includes('payment')) step = 3;
  if (pathname.includes('address')) step = 2;
  if (pathname.includes('personal')) step = 1;
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
        <Redirect to={`${match.url}/personal`} />
      </Switch>
    </KeyboardAwareScrollView>
  </FlexedView>
));

export default Checkout;
