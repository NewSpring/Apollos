import React from 'react';
import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import { Switch, Route, Redirect, withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import Progress from '@ui/Progress';
import ModalView from '@ui/ModalView';

import PersonalDetails from './PersonalDetails';
import BillingAddress from './BillingAddress';
import Payment from './Payment';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentComplete from './PaymentComplete';
import ChangePaymentMethod from './ChangePaymentMethod';

function lastDirectory(pathname = '') {
  const pathParts = pathname.split('/');
  return pathParts.slice(pathParts.length - 1)[0];
}

const progressForLocation = ({ pathname }) => {
  let step = 0;
  const directory = lastDirectory(pathname);
  switch (directory) {
    case 'confirm': step = 4; break;
    case 'payment': step = 3; break;
    case 'address': step = 2; break;
    case 'personal': step = 1; break;
    default: step = 4; break;
  }
  return step / 4;
};

const Checkout = withRouter(({ match, location }) => (
  <ModalView backTo="/give/now" onBackReplace>
    <BackgroundView>
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
    </BackgroundView>
  </ModalView>
));

export default Checkout;
