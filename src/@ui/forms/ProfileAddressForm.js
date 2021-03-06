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
import Button from '@ui/Button';
import { H6 } from '@ui/typography';
import styled from '@ui/styled';
import { withFieldValueHandler, withFieldTouchedHandler } from './formikSetters';

const Status = styled({ textAlign: 'center' })(H6);

const enhance = compose(
  setPropTypes({
    createFieldTouchedHandler: PropTypes.func,
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
    createFieldValueHandler: PropTypes.func,
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
    createFieldTouchedHandler,
    handleSubmit,
    values,
    countries,
    states,
    createFieldValueHandler,
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
              onChangeText={createFieldValueHandler('street1')}
              onBlur={createFieldTouchedHandler('street1')}
              error={touched.street1 && errors.street1}
            />
            <Inputs.Text
              label="Street 2 (Optional)"
              value={values.street2}
              onChangeText={createFieldValueHandler('street2')}
              onBlur={createFieldTouchedHandler('street2')}
              error={touched.street2 && errors.street2}
            />
            <Inputs.Picker
              label="Country"
              value={values.countryId}
              displayValue={get(
                countries.find(country => country.id === values.countryId),
                'label',
              )}
              onValueChange={createFieldValueHandler('countryId')}
              error={touched.countryId && errors.countryId}
            >
              {countries.map(({ label, id }) => (
                <Inputs.PickerItem label={label} value={id} key={id} />
              ))}
            </Inputs.Picker>
            <Inputs.Text
              label="City"
              value={values.city}
              onChangeText={createFieldValueHandler('city')}
              onBlur={createFieldTouchedHandler('city')}
              error={touched.city && errors.city}
            />
            {isUSOrCanada && (
              <Inputs.Picker
                label="State/Territory"
                value={values.stateId}
                displayValue={get(states.find(state => state.id === values.stateId), 'label')}
                onValueChange={createFieldValueHandler('stateId')}
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
              onChangeText={createFieldValueHandler('zip')}
              onBlur={createFieldTouchedHandler('zip')}
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
  street1: get(props, 'user.home.street1', ''),
  street2: get(props, 'user.home.street2', ''),
  city: get(props, 'user.home.city', ''),
  stateId: get(props, 'user.home.state') || 'SC',
  countryId: get(props, 'user.home.country') || 'US',
  zip: get(props, 'user.home.zip', ''),
});

const ProfileAddressForm = compose(
  pure,
  withUser,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
      setSubmitting(true);
      try {
        await props.updateHomeAddress({
          id: props.person.home.id,
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
  withFieldValueHandler,
  withFieldTouchedHandler,
)(ProfileAddressFormWithoutData);

export default ProfileAddressForm;
