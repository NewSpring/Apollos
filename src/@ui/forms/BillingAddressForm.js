import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { branch, renderComponent, compose, setPropTypes } from 'recompose';
import get from 'lodash/get';
import { withFormik } from 'formik';
import Yup from 'yup';
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
    touched: PropTypes.shape({
      countryId: PropTypes.bool,
      stateId: PropTypes.bool,
      street1: PropTypes.bool,
      street2: PropTypes.bool,
      city: PropTypes.bool,
      zipCode: PropTypes.bool,
    }),
    errors: PropTypes.shape({
      countryId: PropTypes.string,
      stateId: PropTypes.string,
      street1: PropTypes.string,
      street2: PropTypes.string,
      city: PropTypes.string,
      zipCode: PropTypes.string,
    }),
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
  }),
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

export const BillingAddressFormWithoutData = enhance(({
  setFieldValue,
  handleSubmit,
  values,
  countries,
  states,
  setFieldTouched,
  touched,
  errors,
  isSubmitting,
  isValid,
}) => {
  const isUSOrCanada = values.countryId === 'US' || values.countryId === 'CA';
  return (
    <View>
      <Inputs.Text
        label="Street Address"
        value={values.street1}
        onChangeText={text => setFieldValue('street1', text)}
        onBlur={() => setFieldTouched('street1', true)}
        error={Boolean(touched.street1 && errors.street1)}
      />
      <Inputs.Text
        label="Street Address (optional)"
        value={values.street2}
        onChangeText={text => setFieldValue('street2', text)}
        onBlur={() => setFieldTouched('street2', true)}
        error={Boolean(touched.street2 && errors.street2)}
      />
      <Inputs.Picker
        label="Country"
        value={values.countryId}
        displayValue={get(countries.find(country => country.id === values.countryId), 'label')}
        onValueChange={value => setFieldValue('countryId', value)}
        error={Boolean(touched.countryId && errors.countryId)}
      >
        {countries.map(({ label, id }) => (
          <Inputs.PickerItem label={label} value={id} key={id} />
        ))}
      </Inputs.Picker>
      <Inputs.Text
        label="City"
        value={values.city}
        onChangeText={text => setFieldValue('city', text)}
        error={Boolean(touched.city && errors.city)}
      />
      {isUSOrCanada &&
        <Inputs.Picker
          label="State/Territory"
          value={values.stateId}
          displayValue={get(states.find(state => state.id === values.stateId), 'label')}
          onValueChange={value => setFieldValue('stateId', value)}
          error={Boolean(touched.stateId && errors.stateId)}
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
        error={Boolean(touched.zipCode && errors.zipCode)}
      />
      <Button onPress={handleSubmit} title="Next" disabled={!isValid} loading={isSubmitting} />
    </View>
  );
});

const BillingAddressForm = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: props => ({
      street1: get(props, 'contributions.street1') || get(props, 'person.home.street1', ''),
      street2: get(props, 'contributions.street2') || get(props, 'person.home.street2', ''),
      city: get(props, 'contributions.city') || get(props, 'person.home.city', ''),
      stateId: get(props, 'contributions.stateId') || get(props, 'person.home.state') || 'SC',
      countryId: get(props, 'contributions.countryId') || get(props, 'person.home.country') || 'US',
      zipCode: get(props, 'contributions.zipCode') || get(props, 'person.home.zip', ''),
    }),
    validationSchema: Yup.object().shape({
      street1: Yup.string().required(),
      street2: Yup.string(),
      city: Yup.string().required(),
      stateId: Yup.string(),
      countryId: Yup.string().required(),
      zipCode: Yup.string().required(),
    }),
    handleSubmit: async (formValues, { props }) => {
      try {
        props.setBillingAddress(formValues);
        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        props.setOrder({
          url: order.url,
        });
        if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
      } catch (e) {
        // todo: If there's an error, we want to stay on this page and display it.
      }
    },
  }),
)(BillingAddressFormWithoutData);

export default BillingAddressForm;
