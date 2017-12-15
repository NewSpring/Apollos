import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { branch, renderComponent, compose, setPropTypes } from 'recompose';
import get from 'lodash/get';
import ActivityIndicator from '@ui/ActivityIndicator';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    setFieldValue: PropTypes.func,
    countries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    })),
    states: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    })),
    values: PropTypes.shape({
      countryId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      stateId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      street1: PropTypes.string,
      street2: PropTypes.string,
      city: PropTypes.string,
      zipCode: PropTypes.string,
    }),
  }),
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

const BillingAddressForm = enhance(({
  setFieldValue,
  handleSubmit,
  values,
  countries,
  states,
}) => {
  const isUSOrCanada = values.countryId === 'US' || values.countryId === 'CA';
  return (
    <View>
      <Inputs.Text
        label="Street Address"
        value={values.street1}
        onChangeText={text => setFieldValue('street1', text)}
      />
      <Inputs.Text
        label="Street Address (optional)"
        value={values.street2}
        onChangeText={text => setFieldValue('street2', text)}
      />
      <Inputs.Picker
        label="Country"
        value={values.countryId}
        displayValue={get(countries.find(country => country.id === values.countryId), 'label')}
        onValueChange={value => setFieldValue('countryId', value)}
      >
        {countries.map(({ label, id }) => (
          <Inputs.PickerItem label={label} value={id} key={id} />
        ))}
      </Inputs.Picker>
      <Inputs.Text
        label="City"
        value={values.city}
        onChangeText={text => setFieldValue('city', text)}
      />
      {isUSOrCanada &&
        <Inputs.Picker
          label="State/Territory"
          value={values.stateId}
          displayValue={get(states.find(state => state.id === values.stateId), 'label')}
          onValueChange={value => setFieldValue('stateId', value)}
        >
          {states.map(({ label, id }) => (
            <Inputs.PickerItem label={label} value={id} key={id} />
          ))}
        </Inputs.Picker>
      }
      <Inputs.Text
        label="Zip/Postal"
        value={values.zipCode}
        onChangeText={text => setFieldValue('zipCode', text)}
      />
      <Button onPress={handleSubmit} title="Next" />
    </View>
  );
});

export default BillingAddressForm;
