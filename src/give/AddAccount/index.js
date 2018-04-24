import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import { Switch, Route, withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import Progress from '@ui/Progress';
import ModalView from '@ui/ModalView';

import withGive from '@data/withGive';

import BillingAddress from './BillingAddress';
import PaymentMethod from './PaymentMethod';
import PaymentMethodConfirmation from './PaymentMethodConfirmation';
import Complete from './Complete';

function lastDirectory(pathname = '') {
  const pathParts = pathname.split('/');
  return pathParts.slice(pathParts.length - 1)[0];
}

const progressForLocation = ({ pathname }) => {
  let step = 0;
  const directory = lastDirectory(pathname);
  if (directory === 'address') step = 1;
  if (directory === 'method') step = 2;
  if (directory === 'confirm' || directory === 'done') step = 3;
  return step / 3; // 3 steps == start the user with progress
};

const enhance = compose(
  withRouter,
  withGive,
);

class Checkout extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    resetContributions: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.resetContributions();
  }

  render() {
    const { match, location } = this.props;
    return (
      <ModalView backTo="/give" onBackReplace>
        <BackgroundView>
          <Header titleText="Add Account" backButton />
          <Progress progress={progressForLocation(location)} />
          <KeyboardAwareScrollView>
            <Switch>
              <Route exact path={`${match.url}/address`} component={BillingAddress} />
              <Route exact path={`${match.url}/method`} component={PaymentMethod} />
              <Route exact path={`${match.url}/confirm`} component={PaymentMethodConfirmation} />
              <Route exact path={`${match.url}/done`} component={Complete} />
            </Switch>
          </KeyboardAwareScrollView>
        </BackgroundView>
      </ModalView>
    );
  }
}


export default enhance(Checkout);
