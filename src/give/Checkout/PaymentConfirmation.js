import React, { PureComponent } from 'react';
import { compose, mapProps } from 'recompose';
import PropTypes from 'prop-types';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import { PaymentConfirmationForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

import { Title, Row, TinyButton, TinyButtonText } from './styles';

export class PaymentConfirmation extends PureComponent {
  static propTypes = {
    onPressChangePaymentMethod: PropTypes.func,
    onPressEdit: PropTypes.func,
  };

  static defaultProps = {
    onPressChangePaymentMethod() {},
    onPressEdit() {},
  };

  render() {
    return (
      <BackgroundView>
        <PaddedView>
          <Row>
            <Title>Review Contribution</Title>
            <TinyButton onPress={this.props.onPressEdit}>
              <TinyButtonText>Edit</TinyButtonText>
            </TinyButton>
          </Row>
        </PaddedView>
        <PaymentConfirmationForm
          navigateToOnComplete="/give/checkout/complete"
          onPressChangePaymentMethod={this.props.onPressChangePaymentMethod}
        />
      </BackgroundView>
    );
  }
}

const enhance = compose(
  withRouter,
  mapProps(props => ({
    onPressChangePaymentMethod() {
      props.history.push('/give/checkout/change-payment-method');
    },
    onPressEdit() {
      props.history.push('/give/checkout');
    },
  })),
);

export default enhance(PaymentConfirmation);
