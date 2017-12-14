import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { mapProps, compose } from 'recompose';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import withGive from '@data/withGive';
import ContributionForm from './ContributionForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import BillingAddressForm from './BillingAddressForm';
import PaymentForm from './PaymentForm';
import PaymentConfirmationForm from './PaymentConfirmationForm';
import PaymentComplete from './PaymentComplete';

export class Now extends Component {
  static propTypes = {
    onSubmitContributionForm: PropTypes.func,
    onSubmitPersonalDetailsForm: PropTypes.func,
    onSubmitBillingAddressForm: PropTypes.func,
    onSubmitCCInformation: PropTypes.func,
    onSubmitBAInformation: PropTypes.func,
    onSelectCC: PropTypes.func,
    onSelectBA: PropTypes.func,
    onSubmitPaymentConfirmation: PropTypes.func,
  };

  static defaultProps = {
    onSubmitContributionForm() {},
    onSubmitPersonalDetailsForm() {},
    onSubmitBillingAddressForm() {},
    onSubmitCCInformation() {},
    onSubmitBAInformation() {},
    onSelectCC() {},
    onSelectBA() {},
    onSubmitPaymentConfirmation() {},
  };

  render() {
    console.log(this.props);
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <Text>Step 1 - Capture Contributions</Text>
        <ContributionForm
          onSubmit={this.props.onSubmitContributionForm}
        />

        <Text>Step 2 - Billing Identity</Text>
        <PersonalDetailsForm
          onSubmit={this.props.onSubmitPersonalDetailsForm}
        />

        <Text>Step 3 - Billing Address</Text>
        <BillingAddressForm
          onSubmit={this.props.onSubmitBillingAddressForm}
        />

        <Text>Step 4 - Payment Details (CC or ACH)</Text>
        <PaymentForm
          onSelectCC={this.props.onSelectCC}
          onSelectBA={this.props.onSelectBA}
          onSubmitCC={this.props.onSubmitCCInformation}
          onSubmitBA={this.props.onSubmitBAInformation}
        />
        <Text>Step 5 - Confirmation</Text>
        <PaymentConfirmationForm
          onSubmit={this.props.onSubmitPaymentConfirmation}
        />

        <Text>Step 6 - Thank you OR Failure</Text>
        <PaymentComplete
          onPressTryAgain={console.log}
          onPressContinue={console.log}
        />
      </FlexedView>
    );
  }
}

const enhance = compose(
  withGive,
  mapProps(props => ({
    onSubmitContributionForm(formValues) {
      props.resetContributions();
      props.addContribution(formValues.firstContribution);

      if (!isEmpty(formValues.secondContribution)) {
        props.addContribution(formValues.secondContribution);
      }
      props.setContributionFrequency(formValues.frequencyId);
      props.setContributionStartDate(formValues.startDate);
    },
    onSubmitPersonalDetailsForm: props.setBillingPerson,
    onSubmitBillingAddressForm: async (formValues) => {
      try {
        props.setBillingAddress(formValues);
        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        props.setOrder({
          url: order.url,
        });
      } catch (err) {
        throw err;
      }
    },
    onSubmitCCInformation: props.setCreditCard,
    onSubmitBAInformation: props.setBankAccount,
    onSelectCC: props.isPayingWithCreditCard,
    onSelectBA: props.isPayingWithBankAccount,
    onSubmitPaymentConfirmation: async () => {
      try {
        props.isPaying(true);
        const payment = await props.postPayment();
        if (props.contributions.paymentMethod === 'creditCard') {
          const validateCardRes = await props.validateSingleCardTransaction(
            props.contributions.orderPaymentToken,
          );
          const invalidCardError = get(validateCardRes, 'data.response.error');
          if (invalidCardError) throw new Error(invalidCardError);
        }

        // NOTE: Need to keep reading through
        // the code to understand what id and name are for
        const completeOrderRes = await props.completeOrder(props.contributions.orderPaymentToken);
        const unableToCompleteOrderError = get(completeOrderRes, 'data.response.error');
        if (unableToCompleteOrderError) throw new Error(unableToCompleteOrderError);

        props.setPaymentResult({
          success: true,
        });
        return payment;
      } catch (err) {
        props.setPaymentResult({
          error: err.message,
        });
        return null;
      } finally {
        props.isPaying(false);
      }
    },
    ...props,
  })),
);

export default enhance(Now);
