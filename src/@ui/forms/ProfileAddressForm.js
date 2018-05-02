import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent, setPropTypes, pure } from 'recompose';
import Yup from 'yup';
import { withFormik } from 'formik';
import get from 'lodash/get';
import ActivityIndicator from '@ui/ActivityIndicator';
import * as Inputs from '@ui/inputs';
import TableView from '@ui/TableView';
import PaddedView from '@ui/PaddedView';
import withUser from '@data/withUser';
import withCheckout from '@data/withCheckout';
import Button from '@ui/Button';
import { H6 } from '@ui/typography';
import styled from '@ui/styled';

const Status = styled({ textAlign: 'center' })(H6);

const enhance = compose(
  setPropTypes({
    setFieldValue: PropTypes.func,
    handleSubmit: PropTypes.func,
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
      street1: PropTypes.string,
      street2: PropTypes.string,
      countryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      city: PropTypes.string,
      stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      zip: PropTypes.string,
    }),
    setFieldTouched: PropTypes.func,
    errors: PropTypes.shape({
      street1: PropTypes.string,
      street2: PropTypes.string,
      countryId: PropTypes.string,
      city: PropTypes.string,
      stateId: PropTypes.string,
      zip: PropTypes.string,
    }),
    touched: PropTypes.shape({
      street1: PropTypes.bool,
      street2: PropTypes.bool,
      countryId: PropTypes.bool,
      city: PropTypes.bool,
      stateId: PropTypes.bool,
      zip: PropTypes.bool,
    }),
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
    status: PropTypes.string,
  }),
);

export const ProfileAddressFormWithoutData = enhance(
  ({
    setFieldValue,
    handleSubmit,
    values,
    countries,
    states,
    setFieldTouched,
    errors,
    touched,
    isSubmitting,
    isValid,
    status,
  }) => {
    const isUSOrCanada = values.countryId === 'US' || values.countryId === 'CA';

    return (
      <PaddedView horizontal={false}>
        <TableView>
          <PaddedView>
            <Inputs.Text
              label="Street"
              value={values.street1}
              onChangeText={text => setFieldValue('street1', text)}
              onBlur={() => setFieldTouched('street1', true)}
              error={touched.street1 && errors.street1}
            />
            <Inputs.Text
              label="Street 2 (Optional)"
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
              label="Zip"
              value={values.zip}
              onChangeText={text => setFieldValue('zip', text)}
              onBlur={() => setFieldTouched('zip', true)}
              error={touched.zip && errors.zip}
            />
          </PaddedView>
        </TableView>
        {status ? <Status>{status}</Status> : null}
        <PaddedView>
          <Button onPress={handleSubmit} title="Save" disabled={!isValid} loading={isSubmitting} />
        </PaddedView>
      </PaddedView>
    );
  },
);

const validationSchema = Yup.object().shape({
  street1: Yup.string(),
  street2: Yup.string().nullable(),
  city: Yup.string(),
  stateId: Yup.string(),
  countryId: Yup.string(),
  zip: Yup.string(),
});

const mapPropsToValues = props => ({
  street1: get(props, 'user.street1') || get(props, 'person.home.street1', ''),
  street2: get(props, 'user.street2') || get(props, 'person.home.street2', ''),
  city: get(props, 'user.city') || get(props, 'person.home.city', ''),
  stateId: get(props, 'user.stateId') || get(props, 'person.home.state') || 'SC',
  countryId: get(props, 'user.countryId') || get(props, 'person.home.country') || 'US',
  zipCode: get(props, 'user.zipCode') || get(props, 'person.home.zip', ''),
});

const ProfileAddressForm = compose(
  pure,
  withUser,
  withCheckout,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
      setSubmitting(true);
      try {
        await props.updateHomeAddress({
          street1: values.street1,
          street2: values.street2,
          countryId: values.countryId,
          city: values.city,
          stateId: values.stateId,
          zip: values.zip,
        });
        setStatus('Your address was updated.');
      } catch (e) {
        setStatus('There was an error. Please try again.');
      }
      setSubmitting(false);
    },
    isInitialValid(props) {
      return validationSchema.isValidSync(mapPropsToValues(props));
    },
  }),
)(ProfileAddressFormWithoutData);

export default ProfileAddressForm;
