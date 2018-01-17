import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';
import {
  formatCardNumber,
  formatCardExpiry,
  parseCardExpiry,
  validateCardNumber,
  validateCardExpiry,
  validateCardCVC,
} from 'creditcardutils';
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
  setFieldTouched,
  touched,
  errors,
  isSubmitting,
  isValid,
  enforceAccountName, // Specific to saving a payment method
}) => (
  <View>
    <Inputs.Picker
      label="Payment Method"
      value={values.paymentMethod}
      displayValue={values.paymentMethod === 'creditCard' ? 'Credit Card' : 'Bank Account'}
      onValueChange={value => setFieldValue('paymentMethod', value)}
      error={Boolean(touched.paymentMethod && errors.paymentMethod)}
    >
      <Inputs.PickerItem label="Credit Card" value={'creditCard'} />
      <Inputs.PickerItem label="Bank Account" value={'bankAccount'} />
    </Inputs.Picker>

    {values.paymentMethod === 'bankAccount' ? (
      <View>
        <Inputs.Text
          label="Account Holder Name"
          value={values.accountName}
          onChangeText={text => setFieldValue('accountName', text)}
          onBlur={() => setFieldTouched('accountName', true)}
          error={Boolean(touched.accountName && errors.accountName)}
        />
        <Inputs.Text
          suffix={<Icon name="bank" />}
          label="Routing Number"
          value={values.routingNumber}
          type="numeric"
          onChangeText={text => setFieldValue('routingNumber', text)}
          onBlur={() => setFieldTouched('routingNumber', true)}
          error={Boolean(touched.routingNumber && errors.routingNumber)}
        />
        <Inputs.Text
          label="Account Number"
          value={values.accountNumber}
          type="numeric"
          onChangeText={text => setFieldValue('accountNumber', text)}
          onBlur={() => setFieldTouched('accountNumber', true)}
          error={Boolean(touched.accountNumber && errors.accountNumber)}
        />
        <Inputs.Picker
          label="Account Type"
          value={values.accountType}
          displayValue={values.accountType === 'checking' ? 'Checking' : 'Savings'}
          onValueChange={value => setFieldValue('accountType', value)}
          error={Boolean(touched.accountType && errors.accountType)}
        >
          <Inputs.PickerItem label="Checking" value="checking" />
          <Inputs.PickerItem label="Savings" value="savings" />
        </Inputs.Picker>
      </View>
    ) : (
      <View>
        <Inputs.Text
          suffix={<Icon name="credit" />}
          label="Card Number"
          type="numericKeyboard"
          value={values.cardNumber}
          onChangeText={text => setFieldValue('cardNumber', formatCardNumber(text))}
          onBlur={() => setFieldTouched('cardNumber', true)}
          error={Boolean(touched.cardNumber && errors.cardNumber)}
        />
        <Inputs.Text
          label="Expiration Date"
          placeholder="mm/yy"
          type="numericKeyboard"
          value={values.expirationDate}
          onChangeText={text => setFieldValue('expirationDate', formatCardExpiry(text))}
          onBlur={() => setFieldTouched('expirationDate', true)}
          error={Boolean(touched.expirationDate && errors.expirationDate)}
        />
        <Inputs.Text
          label="CVV"
          type="numericKeyboard"
          value={values.cvv}
          onChangeText={text => setFieldValue('cvv', text)}
          onBlur={() => setFieldTouched('cvv', true)}
          error={Boolean(touched.cvv && errors.cvv)}
        />
      </View>
    )}

    {
      enforceAccountName ? (
        <View>
          <Inputs.Text
            label="Save Account Name"
            value={values.savedAccountName}
            onChangeText={text => setFieldValue('savedAccountName', text)}
            onBlur={() => setFieldTouched('savedAccountName', true)}
            error={Boolean(touched.savedAccountName && errors.savedAccountName)}
          />
        </View>
      ) : (
        <View>
          <Inputs.Switch
            value={values.willSavePaymentMethod}
            onValueChange={r => setFieldValue('willSavePaymentMethod', r)}
            label="Save this payment for future contributions"
          />
          {values.willSavePaymentMethod && (
            <Inputs.Text
              label="Save Account Name"
              value={values.savedAccountName}
              onChangeText={text => setFieldValue('savedAccountName', text)}
              onBlur={() => setFieldTouched('savedAccountName', true)}
              error={Boolean(touched.savedAccountName && errors.savedAccountName)}
            />
          )}
        </View>
      )
    }

    <Button onPress={handleSubmit} title="Next" disabled={!isValid} loading={isSubmitting} />
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
    willSavePaymentMethod: PropTypes.bool,
  }),
  setFieldTouched: PropTypes.func,
  touched: PropTypes.shape({
    paymentMethod: PropTypes.bool,
    routingNumber: PropTypes.bool,
    accountNumber: PropTypes.bool,
    accountType: PropTypes.bool,
    accountName: PropTypes.bool,
    cardNumber: PropTypes.bool,
    expirationDate: PropTypes.bool,
    cvv: PropTypes.bool,
  }),
  errors: PropTypes.shape({
    paymentMethod: PropTypes.string,
    routingNumber: PropTypes.string,
    accountNumber: PropTypes.string,
    accountType: PropTypes.string,
    accountName: PropTypes.string,
    cardNumber: PropTypes.string,
    expirationDate: PropTypes.string,
    cvv: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  enforceAccountName: PropTypes.bool,
};

const PaymentForm = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: (props) => {
      const paymentMethod = get(props, 'contributions.paymentMethod', 'creditCard');
      return {
        paymentMethod: paymentMethod !== 'bankAccount' || paymentMethod !== 'creditCard' ? 'creditCard' : paymentMethod,
        willSavePaymentMethod: get(props, 'contributions.willSavePaymentMethod', true),
        ...get(props, 'contributions.bankAccount', { accountType: 'checking' }),
        ...get(props, 'contributions.creditCard', {}),
      };
    },
    validationSchema: props => Yup.object().shape({
      paymentMethod: Yup.string().oneOf(['bankAccount', 'creditCard']).required(),
      cardNumber: Yup.string().when('paymentMethod', {
        is: 'creditCard',
        then: Yup.string().test('Credit Card', '${path} is not a valid credit card number', validateCardNumber).required(), // eslint-disable-line
      }),
      expirationDate: Yup.string().when('paymentMethod', {
        is: 'creditCard',
        then: Yup.string().test('Expiration date', '${path} is not a valid expiry date', (value) => { // eslint-disable-line
          if (!value) return false;
          const { month, year } = parseCardExpiry(value);
          return validateCardExpiry(month, year);
        }).required(),
      }),
      cvv: Yup.string().when('paymentMethod', {
        is: 'creditCard',
        then: Yup.string().test('CVV', '${path} is not a valid CVV code', validateCardCVC).required(), // eslint-disable-line
      }),
      accountName: Yup.string().when('paymentMethod', {
        is: 'bankAccount',
        then: Yup.string().required(),
      }),
      routingNumber: Yup.string().when('paymentMethod', {
        is: 'bankAccount',
        then: Yup.string().required(),
      }),
      accountNumber: Yup.string().when('paymentMethod', {
        is: 'bankAccount',
        then: Yup.string().required(),
      }),
      accountType: Yup.string().oneOf(['checking', 'savings']),
      willSavePaymentMethod: Yup.boolean(),
      savedAccountName: props.enforceAccountName ? Yup.string().required() : Yup.string().when('willSavePaymentMethod', {
        is: true,
        then: Yup.string().required(),
      }),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
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

      props.willSavePaymentMethod(formattedValues.willSavePaymentMethod);
      if (formattedValues.willSavePaymentMethod) {
        props.setSavedPaymentName(formattedValues.savedAccountName);
      }
      setSubmitting(false);
      if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
    },
  }),
)(PaymentFormWithoutData);

export default PaymentForm;
