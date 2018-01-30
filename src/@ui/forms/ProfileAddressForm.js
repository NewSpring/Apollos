import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import Yup from 'yup';
import { withFormik } from 'formik';
import ActivityIndicator from '@ui/ActivityIndicator';
import * as Inputs from '@ui/inputs';
import TableView from '@ui/TableView';
import PaddedView from '@ui/PaddedView';
import withUser from '@data/withUser';
import Button from '@ui/Button';

export const ProfileAddressFormWithoutData = ({
  setFieldValue,
  handleSubmit,
  values,
  setFieldTouched,
  errors,
  touched,
  isSubmitting,
  isValid,
}) => (
  <PaddedView horizontal={false}>
    <TableView>
      <PaddedView>
        <Inputs.Text
          label="Street"
          value={values.street}
          onChangeText={text => setFieldValue('street', text)}
          onBlur={() => setFieldTouched('street', true)}
          error={Boolean(touched.street && errors.street)}
        />
        <Inputs.Text
          label="Street 2 (Optional)"
          value={values.street2}
          onChangeText={text => setFieldValue('street2', text)}
          onBlur={() => setFieldTouched('street2', true)}
          error={Boolean(touched.street2 && errors.street2)}
        />
        <Inputs.Text
          label="City"
          value={values.city}
          onChangeText={text => setFieldValue('city', text)}
          onBlur={() => setFieldTouched('city', true)}
          error={Boolean(touched.city && errors.city)}
        />
        <Inputs.Text
          label="State"
          value={values.state}
          onChangeText={text => setFieldValue('state', text)}
          onBlur={() => setFieldTouched('state', true)}
          error={Boolean(touched.state && errors.state)}
        />
        <Inputs.Text
          label="Zip"
          value={values.zip}
          onChangeText={text => setFieldValue('zip', text)}
          onBlur={() => setFieldTouched('zip', true)}
          error={Boolean(touched.zip && errors.zip)}
        />
      </PaddedView>
    </TableView>
    <PaddedView>
      <Button onPress={handleSubmit} title="Save" disabled={!isValid} loading={isSubmitting} />
    </PaddedView>
  </PaddedView>
);

ProfileAddressFormWithoutData.propTypes = {
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    street: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
  setFieldTouched: PropTypes.func,
  errors: PropTypes.shape({
    street: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
  touched: PropTypes.shape({
    street: PropTypes.bool,
    street2: PropTypes.bool,
    city: PropTypes.bool,
    state: PropTypes.bool,
    zip: PropTypes.bool,
  }),
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
};

const validationSchema = Yup.object().shape({
  street: Yup.string(),
  street2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.string(),
});

const mapPropsToValues = props => ({
  ...(props.user || {}),
});

const ProfileAddressForm = compose(
  withUser,
  branch(({ isLoading, user, campuses }) => !user && !campuses && isLoading,
    renderComponent(ActivityIndicator),
  ),
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: () => ({
      // todo
    }),
    isInitialValid(props) {
      return validationSchema
        .isValidSync(mapPropsToValues(props));
    },
  }),
)(ProfileAddressFormWithoutData);

export default ProfileAddressForm;
