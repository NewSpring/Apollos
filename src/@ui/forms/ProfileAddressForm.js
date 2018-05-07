import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent, pure } from 'recompose';
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
import { withFieldValueSetter, withFieldTouchedSetter } from './formikSetters';

const Status = styled({ textAlign: 'center' })(H6);

export const ProfileAddressFormWithoutData = ({
  fieldValueSetter,
  handleSubmit,
  values,
  fieldTouchedSetter,
  errors,
  touched,
  isSubmitting,
  isValid,
  status,
}) => (
  <PaddedView horizontal={false}>
    <TableView>
      <PaddedView>
        <Inputs.Text
          label="Street"
          value={values.street1}
          onChangeText={fieldValueSetter('street1')}
          onBlur={fieldTouchedSetter('street1')}
          error={touched.street1 && errors.street1}
        />
        <Inputs.Text
          label="Street 2 (Optional)"
          value={values.street2}
          onChangeText={fieldValueSetter('street2')}
          onBlur={fieldTouchedSetter('street2')}
          error={touched.street2 && errors.street2}
        />
        <Inputs.Text
          label="City"
          value={values.city}
          onChangeText={fieldValueSetter('city')}
          onBlur={fieldTouchedSetter('city')}
          error={touched.city && errors.city}
        />
        <Inputs.Text
          label="State"
          value={values.state}
          onChangeText={fieldValueSetter('state')}
          onBlur={fieldTouchedSetter('state')}
          error={touched.state && errors.state}
        />
        <Inputs.Text
          label="Zip"
          value={values.zip}
          onChangeText={fieldValueSetter('zip')}
          onBlur={fieldTouchedSetter('zip')}
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

ProfileAddressFormWithoutData.propTypes = {
  fieldValueSetter: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
  fieldTouchedSetter: PropTypes.func,
  errors: PropTypes.shape({
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
  touched: PropTypes.shape({
    street1: PropTypes.bool,
    street2: PropTypes.bool,
    city: PropTypes.bool,
    state: PropTypes.bool,
    zip: PropTypes.bool,
  }),
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  status: PropTypes.string,
};

const validationSchema = Yup.object().shape({
  street: Yup.string(),
  street2: Yup.string().nullable(),
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.string(),
});

const mapPropsToValues = props => get(props, 'user.home', {});

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
          street1: values.street1,
          street2: values.street2,
          city: values.city,
          state: values.state,
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
  withFieldValueSetter,
  withFieldTouchedSetter,
)(ProfileAddressFormWithoutData);

export default ProfileAddressForm;
