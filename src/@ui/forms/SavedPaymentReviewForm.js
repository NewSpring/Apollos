import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';

import { H5, UIText } from '@ui/typography';
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
      <UIText>{`****${last4(this.props.accountNumber)}`}</UIText>
      {/* <Icon name="bankAccount" /> */}
      <UIText>{this.props.routingNumber}</UIText>
      <UIText>{this.props.savedAccountName}</UIText>
    </View>
  );

  renderCreditCard = () => (
    <View>
      <Row>
        <UIText>{`****${last4(this.props.cardNumber)}`}</UIText>
        <Icon name="credit" />
      </Row>
      <UIText>{this.props.expirationDate}</UIText>
      <UIText>{this.props.cvv}</UIText>
      <UIText>{this.props.savedAccountName}</UIText>
    </View>
  );

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <InfoBlock>
          <H5>{'Billing Address'}</H5>
          <UIText>{this.props.street1}</UIText>
          <UIText>{this.props.street2}</UIText>
          <UIText>{`${this.props.city}, ${this.props.state}, ${this.props.zipCode}`}</UIText>
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
        await props.postPayment();

        // NOTE: Need to keep reading through
        // the code to understand what id and name are for
        const savePaymentMethodRes = await props.savePaymentMethod({
          token: props.contributions.orderPaymentToken,
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
