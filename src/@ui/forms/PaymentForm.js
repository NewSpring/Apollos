import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

const enhance = compose(
  setPropTypes({
    setFieldValue: PropTypes.func,
    handleSubmit: PropTypes.func,
    values: PropTypes.shape({
      method: PropTypes.oneOf(['creditCard', 'bankAccount']),
      routingNumber: PropTypes.string,
      accountNumber: PropTypes.string,
      accountType: PropTypes.oneOf(['checking', 'savings']),
      accountName: PropTypes.string,
      cardNumber: PropTypes.string,
      expirationDate: PropTypes.string,
      cvv: PropTypes.string,
    }),
  }),
);

const PaymentForm = enhance(({
  setFieldValue,
  handleSubmit,
  values,
}) => (
  <View>
    <Inputs.Picker
      label="Payment Method"
      value={values.method}
      displayValue={values.method === 'creditCard' ? 'Credit Card' : 'Bank Account'}
      onValueChange={value => setFieldValue('method', value)}
    >
      <Inputs.PickerItem label="Credit Card" value={'creditCard'} />
      <Inputs.PickerItem label="Bank Account" value={'bankAccount'} />
    </Inputs.Picker>

    {values.method === 'creditCard' ? (
      <View>
        <Inputs.Text
          label="Card Number"
          value={values.cardNumber}
          onChangeText={text => setFieldValue('cardNumber', text)}
        />
        <Inputs.Text
          label="Expiration Date"
          placeholder="mm/yy"
          value={values.expirationDate}
          onChangeText={text => setFieldValue('expirationDate', text)}
        />
        <Inputs.Text
          label="CVV"
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
          onChangeText={text => setFieldValue('routingNumber', text)}
        />
        <Inputs.Text
          label="Account Number"
          value={values.accountNumber}
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
));

export default PaymentForm;
