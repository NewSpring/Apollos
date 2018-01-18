import React, { PureComponent } from 'react';
import { compose, mapProps } from 'recompose';
import PropTypes from 'prop-types';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import { PaymentConfirmationForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

export class PaymentConfirmation extends PureComponent {
  static propTypes = {
    onPressChangePaymentMethod: PropTypes.func,
  };

  static defaultProps = {
    onPressChangePaymentMethod() {},
  };

  render() {
    return (
      <PaddedView>
        <H4>Review Contribution</H4>
        <H6>Step 4 of 4</H6>
        <PaymentConfirmationForm
          navigateToOnComplete="complete"
          onPressChangePaymentMethod={this.props.onPressChangePaymentMethod}
        />
      </PaddedView>
    );
  }
}

const enhance = compose(
  withRouter,
  mapProps(props => ({
    onPressChangePaymentMethod() {
      props.history.push('/give/checkout/change-payment-method');
    },
  })),
);

export default enhance(PaymentConfirmation);
