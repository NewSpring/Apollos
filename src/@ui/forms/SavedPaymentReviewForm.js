import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';

import { H5, H6, H7 } from '@ui/typography';
import { withRouter } from '@ui/NativeWebRouter';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';
import styled from '@ui/styled';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';
import TableView, { Cell, Divider } from '@ui/TableView';
import PaddedView from '@ui/PaddedView';
import sentry from '@utils/sentry';

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})(View);

const LabelText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H7);

const SmallValueText = compose(
  styled(({ theme }) => ({
    color: theme.colors.text.secondary,
  })),
)(H6);


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
      <PaddedView>
        <Row>
          <SmallValueText>{`****${last4(this.props.accountNumber)}`}</SmallValueText>
          <Icon name="bank" />
        </Row>
      </PaddedView>
      <Divider />
      <PaddedView>
        <Row>
          <LabelText>Routing: </LabelText>
          <SmallValueText>{this.props.routingNumber}</SmallValueText>
        </Row>
        <Row>
          <LabelText>Account Name: </LabelText>
          <SmallValueText>{this.props.savedAccountName}</SmallValueText>
        </Row>
      </PaddedView>
    </View>
  );

  renderCreditCard = () => (
    <View>
      <PaddedView>
        <Row>
          <SmallValueText>{`****${last4(this.props.cardNumber)}`}</SmallValueText>
          <Icon name="credit" />
        </Row>
      </PaddedView>
      <Divider />
      <PaddedView>
        <Row>
          <LabelText>Exp: </LabelText>
          <SmallValueText>{this.props.expirationDate}</SmallValueText>
        </Row>
        <Row>
          <LabelText>CVV: </LabelText>
          <SmallValueText>{this.props.cvv}</SmallValueText>
        </Row>
        <Row>
          <LabelText>Accout Name: </LabelText>
          <SmallValueText>{this.props.savedAccountName}</SmallValueText>
        </Row>
      </PaddedView>
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
        <TableView>
          <Cell>
            <H5>{'Billing Address'}</H5>
          </Cell>
          <Divider />
          <PaddedView>
            <H7>{this.props.street1}</H7>
            <H7>{this.props.street2}</H7>
            <H7>{`${this.props.city}, ${this.props.state}, ${this.props.zipCode}`}</H7>
          </PaddedView>
        </TableView>

        <TableView>
          <Cell>
            <H5>{'Account Details'}</H5>
          </Cell>
          <Divider />
          {this.props.paymentMethod === 'bankAccount' ? this.renderBankAccount() : this.renderCreditCard()}
        </TableView>

        <PaddedView>
          <Button onPress={this.props.onSubmit} title="Create Account" loading={this.props.isSaving} />
        </PaddedView>
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
        sentry.captureException(err);
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
