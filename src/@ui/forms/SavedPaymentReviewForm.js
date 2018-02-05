import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';

import { H5, H7 } from '@ui/typography';
import { withRouter } from '@ui/NativeWebRouter';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';
import styled from '@ui/styled';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';

const InfoBlock = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const Row = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
  flexDirection: 'row',
  justifyContent: 'space-between',
}))(View);

export class PaymentConfirmationFormWithoutData extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    isSaving: PropTypes.bool,
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    paymentMethod: PropTypes.oneOf(['bankAccount', 'creditCard']),
    accountNumber: PropTypes.string,
    routingNumber: PropTypes.string,
    savedAccountName: PropTypes.string,
    cardNumber: PropTypes.string,
    expirationDate: PropTypes.string,
    cvv: PropTypes.string,
  };

  static defaultProps = {
    isLoading: true,
    onSubmit() {},
    isSaving: false,
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'creditCard',
    accountNumber: '',
    routingNumber: '',
    savedAccountName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };

  renderBankAccount = () => (
    <View>
      <H7>{`****${last4(this.props.accountNumber)}`}</H7>
      {/* <Icon name="bankAccount" /> */}
      <H7>{this.props.routingNumber}</H7>
      <H7>{this.props.savedAccountName}</H7>
    </View>
  );

  renderCreditCard = () => (
    <View>
      <Row>
        <H7>{`****${last4(this.props.cardNumber)}`}</H7>
        <Icon name="credit" />
      </Row>
      <H7>{this.props.expirationDate}</H7>
      <H7>{this.props.cvv}</H7>
      <H7>{this.props.savedAccountName}</H7>
    </View>
  );

  render() {
    if (this.props.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <InfoBlock>
          <H5>{'Billing Address'}</H5>
          <H7>{this.props.street1}</H7>
          <H7>{this.props.street2}</H7>
          <H7>{`${this.props.city}, ${this.props.state}, ${this.props.zipCode}`}</H7>
        </InfoBlock>

        <InfoBlock>
          <H5>{'Account Details'}</H5>
          {this.props.paymentMethod === 'bankAccount' ? this.renderBankAccount() : this.renderCreditCard()}
        </InfoBlock>

        <Button onPress={this.props.onSubmit} title="Create Account" loading={this.props.isSaving} />
      </View>
    );
  }
}

const PaymentConfirmationForm = compose(
  withGive,
  withRouter,
  withCheckout,
  withProps(props => ({
    isLoading: get(props, 'isLoading'),
    isSaving: get(props, 'contributions.isSavingPaymentMethod'),
    street1: get(props, 'contributions.street1'),
    street2: get(props, 'contributions.street2'),
    city: get(props, 'contributions.city'),
    state: get(props, 'contributions.stateId'),
    zipCode: get(props, 'contributions.zipCode'),
    paymentMethod: get(props, 'contributions.paymentMethod'),
    savedAccountName: get(props, 'contributions.savedAccountName'),
    accountNumber: get(props, 'contributions.bankAccount.accountNumber'),
    routingNumber: get(props, 'contributions.bankAccount.routingNumber'),
    cardNumber: get(props, 'contributions.creditCard.cardNumber'),
    expirationDate: get(props, 'contributions.creditCard.expirationDate'),
    cvv: get(props, 'contributions.creditCard.cvv'),
    onSubmit: async () => {
      try {
        props.isSavingPaymentMethod(true);
        if (props.contributions.paymentMethod === 'creditCard') {
          await props.validateSingleCardTransaction(); // This seems unnecessary
        }
        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        const token = order.url.split('/').pop();
        await props.postPayment(order.url);

        // NOTE: Need to keep reading through
        // the code to understand what id and name are for
        const savePaymentMethodRes = await props.savePaymentMethod({
          token,
          name: props.contributions.savedAccountName,
        });
        const unableToCompleteOrderError = get(savePaymentMethodRes, 'data.response.error');
        if (unableToCompleteOrderError) throw new Error(unableToCompleteOrderError);

        props.setPaymentResult({
          success: true,
        });
        return true;
      } catch (err) {
        console.log('err', err); // eslint-disable-line no-console
        props.setPaymentResult({
          error: err.message,
        });
        return null;
      } finally {
        props.isSavingPaymentMethod(false);
        if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
      }
    },
  })),
)(PaymentConfirmationFormWithoutData);

export default PaymentConfirmationForm;
