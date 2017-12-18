import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { branch, renderComponent, compose, setPropTypes } from 'recompose';
import get from 'lodash/get';
import { withFormik } from 'formik';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import { withRouter } from '@ui/NativeWebRouter';

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

export const BillingAddressFormWithoutData = enhance(({
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
        type="numeric"
        value={values.zipCode}
        onChangeText={text => setFieldValue('zipCode', text)}
      />
      <Button onPress={handleSubmit} title="Next" />
    </View>
  );
});

const BillingAddressForm = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: props => ({
      street1: get(props, 'person.home.street1', ''),
      street2: get(props, 'person.home.street2', ''),
      city: get(props, 'person.home.city', ''),
      stateId: get(props, 'person.home.state') || 'SC',
      countryId: get(props, 'person.home.country') || 'US',
      zipCode: get(props, 'person.home.zip', ''),
    }),
    handleSubmit: async (formValues, { props }) => {
      try {
        props.setBillingAddress(formValues);
        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        props.setOrder({
          url: order.url,
        });
        if (props.navigateToOnComplete) props.history.replace(props.navigateToOnComplete);
      } catch (e) {
        // todo: If there's an error, we want to stay on this page and display it.
      }
    },
  }),
)(BillingAddressFormWithoutData);

export default BillingAddressForm;
