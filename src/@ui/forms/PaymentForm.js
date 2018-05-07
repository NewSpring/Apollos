import React from 'react';
import { View } from 'react-native';
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
import TableView, { FormFields } from '@ui/TableView';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';
import PaddedView from '@ui/PaddedView';

import { withFieldValueSetter, withFieldTouchedSetter } from './formikSetters';

export const PaymentFormWithoutData = ({
  fieldValueSetter,
  fieldTouchedSetter,
  handleSubmit,
  values,
  touched,
  errors,
  isSubmitting,
  isValid,
  enforceAccountName, // Specific to saving a payment method
}) => (
  <View>
    <TableView responsive={false}>
      <FormFields>
        <Inputs.Picker
          label="Payment Method"
          value={values.paymentMethod}
          displayValue={values.paymentMethod === 'creditCard' ? 'Credit Card' : 'Bank Account'}
          onValueChange={fieldValueSetter('paymentMethod')}
          error={touched.paymentMethod && errors.paymentMethod}
        >
          <Inputs.PickerItem label="Credit Card" value={'creditCard'} />
          <Inputs.PickerItem label="Bank Account" value={'bankAccount'} />
        </Inputs.Picker>

        {values.paymentMethod === 'bankAccount' ? (
          <View>
            <Inputs.Text
              label="Account Holder Name"
              value={values.accountName}
              onChangeText={fieldValueSetter('accountName')}
              onBlur={fieldTouchedSetter('accountName')}
              error={touched.accountName && errors.accountName}
            />
            <Inputs.Text
              suffix={<Icon name="bank" />}
              label="Routing Number"
              value={values.routingNumber}
              type="numeric"
              onChangeText={fieldValueSetter('routingNumber')}
              onBlur={fieldTouchedSetter('routingNumber')}
              error={touched.routingNumber && errors.routingNumber}
            />
            <Inputs.Text
              label="Account Number"
              value={values.accountNumber}
              type="numeric"
              onChangeText={fieldValueSetter('accountNumber')}
              onBlur={fieldTouchedSetter('accountNumber')}
              error={touched.accountNumber && errors.accountNumber}
            />
            <Inputs.Picker
              label="Account Type"
              value={values.accountType}
              displayValue={values.accountType === 'checking' ? 'Checking' : 'Savings'}
              onValueChange={fieldValueSetter('accountType')}
              error={touched.accountType && errors.accountType}
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
              onChangeText={fieldValueSetter('cardNumber', formatCardNumber)}
              onBlur={fieldTouchedSetter('cardNumber')}
              error={touched.cardNumber && errors.cardNumber}
            />
            <Inputs.Text
              label="Expiration Date"
              placeholder="mm/yy"
              type="numericKeyboard"
              value={values.expirationDate}
              onChangeText={fieldValueSetter('expirationDate', formatCardExpiry)}
              onBlur={fieldTouchedSetter('expirationDate')}
              error={touched.expirationDate && errors.expirationDate}
            />
            <Inputs.Text
              label="CVV"
              type="numericKeyboard"
              value={values.cvv}
              onChangeText={fieldValueSetter('cvv')}
              onBlur={fieldTouchedSetter('cvv')}
              error={touched.cvv && errors.cvv}
            />
          </View>
        )}
      </FormFields>
    </TableView>
    <TableView responsive={false}>
      <FormFields>
        {enforceAccountName ? (
          <View>
            <Inputs.Text
              label="Save Account Name"
              value={values.savedAccountName}
              onChangeText={fieldValueSetter('savedAccountName')}
              onBlur={fieldTouchedSetter('savedAccountName')}
              error={touched.savedAccountName && errors.savedAccountName}
            />
          </View>
        ) : (
          <View>
            <Inputs.Switch
              value={values.willSavePaymentMethod}
              onValueChange={fieldValueSetter('willSavePaymentMethod')}
              label="Save this payment for future contributions"
            />
            {values.willSavePaymentMethod && (
              <Inputs.Text
                label="Save Account Name"
                value={values.savedAccountName}
                onChangeText={fieldValueSetter('savedAccountName')}
                onBlur={fieldTouchedSetter('savedAccountName')}
                error={touched.savedAccountName && errors.savedAccountName}
              />
            )}
          </View>
        )}
      </FormFields>
    </TableView>
    <PaddedView>
      <Button onPress={handleSubmit} title="Next" disabled={!isValid} loading={isSubmitting} />
    </PaddedView>
  </View>
);

PaymentFormWithoutData.propTypes = {
  fieldValueSetter: PropTypes.func,
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
  fieldTouchedSetter: PropTypes.func,
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

const mapPropsToValues = (props) => {
  const paymentMethod = get(props, 'contributions.paymentMethod', 'creditCard');
  return {
    paymentMethod:
      paymentMethod !== 'bankAccount' || paymentMethod !== 'creditCard'
        ? 'creditCard'
        : paymentMethod,
    willSavePaymentMethod: get(props, 'enforceAccountName') ? true : get(props, 'contributions.willSavePaymentMethod'),
    ...get(props, 'contributions.bankAccount', { accountType: 'checking' }),
    ...get(props, 'contributions.creditCard', {}),
  };
};

const validationSchema = props =>
  Yup.object().shape({
    paymentMethod: Yup.string()
      .oneOf(['bankAccount', 'creditCard'])
      .required(),
    cardNumber: Yup.string().when('paymentMethod', {
      is: 'creditCard',
      then: Yup.string()
        .test('Credit Card', 'The card number entered is not a valid number', validateCardNumber) // eslint-disable-line
        .required(),
    }),
    expirationDate: Yup.string().when('paymentMethod', {
      is: 'creditCard',
      then: Yup.string()
        // eslint-disable-next-line
        .test('Expiration date', 'The expiration date is not a valid expiry date', (value) => {
          if (!value) return false;
          const { month, year } = parseCardExpiry(value);
          return validateCardExpiry(month, year);
        })
        .required(),
    }),
    cvv: Yup.string().when('paymentMethod', {
      is: 'creditCard',
      then: Yup.string()
        .test('CVV', 'The CVV entered is not a valid CVV code', validateCardCVC) // eslint-disable-line
        .required(),
    }),
    accountName: Yup.string().when('paymentMethod', {
      is: 'bankAccount',
      then: Yup.string().required('Account Holder Name is a required field'),
    }),
    routingNumber: Yup.string().when('paymentMethod', {
      is: 'bankAccount',
      then: Yup.string().required('Routing Number is a required field'),
    }),
    accountNumber: Yup.string().when('paymentMethod', {
      is: 'bankAccount',
      then: Yup.string().required('Account Number is a required field'),
    }),
    accountType: Yup.string().oneOf(['checking', 'savings']),
    willSavePaymentMethod: Yup.boolean(),
    savedAccountName: props.enforceAccountName
      ? Yup.string().required()
      : Yup.string().when('willSavePaymentMethod', {
        is: true,
        then: Yup.string().required('Saved Payment Name is a required field'),
      }),
  });

const PaymentForm = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues,
    validationSchema,
    isInitialValid(props) {
      return validationSchema(props).isValidSync(mapPropsToValues(props));
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      const formattedValues = { ...values };
      const selectPaymentType =
        values.paymentMethod === 'bankAccount'
          ? props.isPayingWithBankAccount
          : props.isPayingWithCreditCard;
      selectPaymentType();

      if (formattedValues.cardNumber) {
        formattedValues.cardNumber = formattedValues.cardNumber.replace(/\D/g, '');
      }
      if (formattedValues.expirationDate) {
        const { month, year } = parseCardExpiry(formattedValues.expirationDate);
        formattedValues.expirationDate = moment()
          .month(month - 1)
          .year(year)
          .format('MM/YY');
      }

      const setAccountDetails =
        values.paymentMethod === 'bankAccount' ? props.setBankAccount : props.setCreditCard;
      setAccountDetails(formattedValues);

      props.willSavePaymentMethod(formattedValues.willSavePaymentMethod);
      if (formattedValues.willSavePaymentMethod) {
        props.setSavedPaymentName(formattedValues.savedAccountName);
      }
      setSubmitting(false);
      if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
    },
  }),
  withFieldValueSetter,
  withFieldTouchedSetter,
)(PaymentFormWithoutData);

export default PaymentForm;
