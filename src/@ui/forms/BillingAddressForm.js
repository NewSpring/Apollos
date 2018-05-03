import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { branch, renderComponent, compose, setPropTypes } from 'recompose';
import get from 'lodash/get';
import { withFormik } from 'formik';
import Yup from 'yup';

import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import withUser from '@data/withUser';
import { withRouter } from '@ui/NativeWebRouter';
import PaddedView from '@ui/PaddedView';
import TableView, { FormFields } from '@ui/TableView';
import ActivityIndicator from '@ui/ActivityIndicator';
import sentry from '@utils/sentry';
import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    setFieldValue: PropTypes.func,
    countries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
    ),
    values: PropTypes.shape({
      countryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

export const BillingAddressFormWithoutData = enhance(
  ({
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
        <TableView responsive={false}>
          <FormFields>
            <Inputs.Text
              label="Street Address"
              value={values.street1}
              onChangeText={text => setFieldValue('street1', text)}
              onBlur={() => setFieldTouched('street1', true)}
              error={touched.street1 && errors.street1}
            />
            <Inputs.Text
              label="Street Address (optional)"
              value={values.street2}
              onChangeText={text => setFieldValue('street2', text)}
              onBlur={() => setFieldTouched('street2', true)}
              error={touched.street2 && errors.street2}
            />
            <Inputs.Picker
              label="Country"
              value={values.countryId}
              displayValue={get(
                countries.find(country => country.id === values.countryId),
                'label',
              )}
              onValueChange={value => setFieldValue('countryId', value)}
              error={touched.countryId && errors.countryId}
            >
              {countries.map(({ label, id }) => (
                <Inputs.PickerItem label={label} value={id} key={id} />
              ))}
            </Inputs.Picker>
            <Inputs.Text
              label="City"
              value={values.city}
              onChangeText={text => setFieldValue('city', text)}
              onBlur={() => setFieldTouched('city', true)}
              error={touched.city && errors.city}
            />
            {isUSOrCanada && (
              <Inputs.Picker
                label="State/Territory"
                value={values.stateId}
                displayValue={get(states.find(state => state.id === values.stateId), 'label')}
                onValueChange={value => setFieldValue('stateId', value)}
                error={touched.stateId && errors.stateId}
              >
                {states.map(({ label, id }) => (
                  <Inputs.PickerItem label={label} value={id} key={id} />
                ))}
              </Inputs.Picker>
            )}
            <Inputs.Text
              label="Zip/Postal"
              type="numeric"
              value={values.zipCode}
              onChangeText={text => setFieldValue('zipCode', text)}
              onBlur={() => setFieldTouched('zipCode', true)}
              error={touched.zipCode && errors.zipCode}
            />
          </FormFields>
        </TableView>
        <PaddedView>
          <Button onPress={handleSubmit} title="Next" disabled={!isValid} loading={isSubmitting} />
        </PaddedView>
      </View>
    );
  },
);

const validationSchema = Yup.object().shape({
  street1: Yup.string().required('Street address is a required field'),
  street2: Yup.string().nullable(),
  city: Yup.string().required('City is a required field'),
  stateId: Yup.string(),
  countryId: Yup.string().required('Country is a required field'),
  zipCode: Yup.string().required('Zip Code is a required field'),
});

const mapPropsToValues = props => ({
  street1: get(props, 'user.home.street1', ''),
  street2: get(props, 'user.home.street2', ''),
  city: get(props, 'user.home.city', ''),
  stateId: get(props, 'user.home.state') || 'SC',
  countryId: get(props, 'user.home.country') || 'US',
  zipCode: get(props, 'user.home.zip', ''),
});

const BillingAddressForm = compose(
  withGive,
  withCheckout,
  withUser,
  withRouter,
  withFormik({
    mapPropsToValues,
    validationSchema,
    isInitialValid(props) {
      return validationSchema.isValidSync(mapPropsToValues(props));
    },
    handleSubmit: async (formValues, { props, setSubmitting }) => {
      try {
        setSubmitting(true);
        props.setBillingAddress(formValues);
        setSubmitting(false);
        if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
      } catch (e) {
        // TODO: If there's an error, we want to stay on this page and display it.
        sentry.captureException(e);
      }
    },
  }),
)(BillingAddressFormWithoutData);

export default BillingAddressForm;
