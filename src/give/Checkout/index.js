import React from 'react';
import { ScrollView } from 'react-native';
import { Switch, Route, Redirect, withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';

import PersonalDetails from './PersonalDetails';
import BillingAddress from './BillingAddress';
import Payment from './Payment';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentComplete from './PaymentComplete';

const Checkout = withRouter(({ match }) => (
  <FlexedView>
    <Header titleText="My Giving" />
    <ScrollView>
      <PaddedView>
        <Switch>
          <Route path={`${match.url}/personal`} component={PersonalDetails} />
          <Route path={`${match.url}/address`} component={BillingAddress} />
          <Route exact path={`${match.url}/payment`} component={Payment} />
          <Route exact path={`${match.url}/confirm`} component={PaymentConfirmation} />
          <Route exact path={`${match.url}/complete`} component={PaymentComplete} />
          <Redirect to={`${match.url}/personal`} />
        </Switch>
      </PaddedView>
    </ScrollView>
  </FlexedView>
));

export default Checkout;
