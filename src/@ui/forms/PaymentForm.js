import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import { formatCardNumber, formatCardExpiry, parseCardExpiry } from 'creditcardutils';
import get from 'lodash/get';
import moment from 'moment';

import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import { withRouter } from '@ui/NativeWebRouter';
import Icon from '@ui/Icon';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

export const PaymentFormWithoutData = ({
  setFieldValue,
  handleSubmit,
  values,
}) => (
  <View>
    <Inputs.Picker
      label="Payment Method"
      value={values.paymentMethod}
      displayValue={values.paymentMethod === 'creditCard' ? 'Credit Card' : 'Bank Account'}
      onValueChange={value => setFieldValue('paymentMethod', value)}
    >
      <Inputs.PickerItem label="Credit Card" value={'creditCard'} />
      <Inputs.PickerItem label="Bank Account" value={'bankAccount'} />
    </Inputs.Picker>

    {values.paymentMethod === 'creditCard' ? (
      <View>
        <Inputs.Text
          suffix={<Icon name="credit" />}
          label="Card Number"
          type="numeric"
          value={values.cardNumber}
          onChangeText={text => setFieldValue('cardNumber', formatCardNumber(text))}
        />
        <Inputs.Text
          label="Expiration Date"
          placeholder="mm/yy"
          type="numeric"
          value={values.expirationDate}
          onChangeText={text => setFieldValue('expirationDate', formatCardExpiry(text))}
        />
        <Inputs.Text
          label="CVV"
          type="numeric"
          value={values.cvv}
          onChangeText={text => setFieldValue('cvv', text)}
        />
      </View>
    ) : (
      <View>
        <Inputs.Text
          label="Account Holder Name"
          value={values.accountName}
          onChangeText={text => setFieldValue('accountName', text)}
        />
        <Inputs.Text
          label="Routing Number"
          value={values.routingNumber}
          type="numeric"
          onChangeText={text => setFieldValue('routingNumber', text)}
        />
        <Inputs.Text
          label="Account Number"
          value={values.accountNumber}
          type="numeric"
          onChangeText={text => setFieldValue('accountNumber', text)}
        />
        <Inputs.Picker
          label="Account Type"
          value={values.accountType}
          displayValue={values.accountType === 'checking' ? 'Checking' : 'Savings'}
          onValueChange={value => setFieldValue('accountType', value)}
        >
          <Inputs.PickerItem label="Checking" value="checking" />
          <Inputs.PickerItem label="Savings" value="savings" />
        </Inputs.Picker>
      </View>
    )}

    <Button onPress={handleSubmit} title="Next" />
  </View>
);

PaymentFormWithoutData.propTypes = {
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    paymentMethod: PropTypes.oneOf(['creditCard', 'bankAccount']),
    routingNumber: PropTypes.string,
    accountNumber: PropTypes.string,
    accountType: PropTypes.oneOf(['checking', 'savings']),
    accountName: PropTypes.string,
    cardNumber: PropTypes.string,
    expirationDate: PropTypes.string,
    cvv: PropTypes.string,
  }),
};

const PaymentForm = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: props => ({
      paymentMethod: get(props, 'contributions.paymentMethod') || 'creditCard',
      ...get(props, 'contributions.bankAccount', {}),
      ...get(props, 'contributions.creditCard', {}),
    }),
    handleSubmit: (values, { props }) => {
      const formattedValues = { ...values };
      const selectPaymentType = values.paymentMethod === 'bankAccount' ? props.isPayingWithBankAccount : props.isPayingWithCreditCard;
      selectPaymentType();

      if (formattedValues.cardNumber) formattedValues.cardNumber = formattedValues.cardNumber.replace(/\D/g, '');
      if (formattedValues.expirationDate) {
        const { month, year } = parseCardExpiry(formattedValues.expirationDate);
        formattedValues.expirationDate = moment().set('month', month).set('year', year).format('MM/YY');
      }

      const setAccountDetails = values.paymentMethod === 'bankAccount' ? props.setBankAccount : props.setCreditCard;
      setAccountDetails(formattedValues);
      if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
    },
  }),
)(PaymentFormWithoutData);

export default PaymentForm;
