import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import get from 'lodash/get';
import { withFormik } from 'formik';
import Yup from 'yup';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import { withRouter } from '@ui/NativeWebRouter';
import ActivityIndicator from '@ui/ActivityIndicator';
import PaddedView from '@ui/PaddedView';
import TableView, { FormFields } from '@ui/TableView';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';
import { withFieldValueSetter, withFieldTouchedSetter } from './formikSetters';

export const PersonalDetailsFormWithoutData = ({
  fieldValueSetter,
  handleSubmit,
  values,
  campuses,
  fieldTouchedSetter,
  errors,
  touched,
  isSubmitting,
  isValid,
}) => (
  <View>
    <TableView responsive={false}>
      <FormFields>
        <Inputs.Text
          label="First Name"
          value={values.firstName}
          onChangeText={fieldValueSetter('firstName')}
          onBlur={fieldTouchedSetter('firstName', true)}
          error={touched.firstName && errors.firstName}
        />
        <Inputs.Text
          label="Last Name"
          value={values.lastName}
          onChangeText={fieldValueSetter('lastName')}
          onBlur={fieldTouchedSetter('lastName', true)}
          error={touched.lastName && errors.lastName}
        />
        <Inputs.Text
          label="Email"
          type="email"
          value={values.email}
          onChangeText={fieldValueSetter('email')}
          onBlur={fieldTouchedSetter('email', true)}
          error={touched.email && errors.email}
        />
        <Inputs.Picker
          label="Campus"
          value={values.campusId}
          displayValue={get(campuses.find(campus => campus.id === values.campusId), 'label')}
          onValueChange={fieldValueSetter('campusId')}
          error={errors.campusId}
        >
          {campuses.map(({ label, id }) => <Inputs.PickerItem label={label} value={id} key={id} />)}
        </Inputs.Picker>
      </FormFields>
    </TableView>
    <PaddedView>
      <Button onPress={handleSubmit} title="Next" disabled={!isValid} loading={isSubmitting} />
    </PaddedView>
  </View>
);

PersonalDetailsFormWithoutData.propTypes = {
  fieldValueSetter: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    campusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  fieldTouchedSetter: PropTypes.func,
  errors: PropTypes.shape({
    campusId: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  touched: PropTypes.shape({
    campusId: PropTypes.bool,
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    email: PropTypes.bool,
  }),
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  campuses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is a required field'),
  lastName: Yup.string().required('Last Name is a required field'),
  email: Yup.string()
    .email()
    .required('Email is a required field'),
  campusId: Yup.number().required('Campus is required'),
});

const mapPropsToValues = props => ({
  firstName: get(props, 'contributions.firstName') || get(props, 'person.firstName'),
  lastName: get(props, 'contributions.lastName') || get(props, 'person.lastName'),
  email: get(props, 'contributions.email') || get(props, 'person.email'),
  campusId:
    get(props, 'contributions.campusId') ||
    get(props, 'person.campus.id') ||
    get(props, 'campuses.0.id'),
});

const PersonalDetailsForm = compose(
  withGive,
  withCheckout,
  withRouter,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: (values, { props }) =>
      props.setBillingPerson(values).then(() => {
        if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
      }),
    isInitialValid(props) {
      return validationSchema.isValidSync(mapPropsToValues(props));
    },
  }),
  withFieldValueSetter,
  withFieldTouchedSetter,
)(PersonalDetailsFormWithoutData);

export default PersonalDetailsForm;
