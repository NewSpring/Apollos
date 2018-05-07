import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import { get } from 'lodash';
import Yup from 'yup';
import { withFormik } from 'formik';
import moment from 'moment';

import ActivityIndicator from '@ui/ActivityIndicator';
import * as Inputs from '@ui/inputs';
import TableView from '@ui/TableView';
import PaddedView from '@ui/PaddedView';
import withCampuses from '@data/withCampuses';
import withUser from '@data/withUser';
import Button from '@ui/Button';
import sentry from '@utils/sentry';
import Status from './FormStatusText';
import { withFieldValueSetter, withFieldTouchedSetter } from './formikSetters';

export const ProfileDetailsFormWithoutData = ({
  fieldValueSetter,
  handleSubmit,
  values,
  campuses = [],
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
          label="Nickname"
          value={values.nickName}
          onChangeText={fieldValueSetter('nickName')}
          onBlur={fieldTouchedSetter('nickName')}
          error={touched.nickName && errors.nickName}
        />
        <Inputs.Text
          label="First Name"
          value={values.firstName}
          onChangeText={fieldValueSetter('firstName')}
          onBlur={fieldTouchedSetter('firstName')}
          error={touched.firstName && errors.firstName}
        />
        <Inputs.Text
          label="Last Name"
          value={values.lastName}
          onChangeText={fieldValueSetter('lastName')}
          onBlur={fieldTouchedSetter('lastName')}
          error={touched.lastName && errors.lastName}
        />
      </PaddedView>
    </TableView>
    <TableView>
      <PaddedView>
        <Inputs.Text
          label="Email"
          value={values.email}
          onChangeText={fieldValueSetter('email')}
          onBlur={fieldTouchedSetter('email')}
          error={touched.email && errors.email}
        />
      </PaddedView>
    </TableView>
    <TableView>
      <PaddedView>
        <Inputs.DateInput
          label="Birthday"
          value={values.birthday}
          placeholder={'mm/dd/yyyy'}
          displayValue={
            values.birthday ? moment(values.birthday).format('MM/DD/YYYY') : values.birthDay
          }
          onChange={fieldValueSetter('birthday')}
          onBlur={fieldTouchedSetter('birthday')}
          error={touched.birthday && errors.birthday}
        />
      </PaddedView>
    </TableView>
    <TableView>
      <PaddedView>
        <Inputs.Picker
          label="Campus"
          value={values.campusId}
          displayValue={get(campuses.find(campus => campus.id === values.campusId), 'name')}
          onValueChange={fieldValueSetter('campusId')}
          error={errors.campusId}
        >
          {campuses.map(({ name, id }) => <Inputs.PickerItem label={name} value={id} key={id} />)}
        </Inputs.Picker>
      </PaddedView>
    </TableView>
    {status ? <Status>{status}</Status> : null}
    <PaddedView>
      <Button onPress={handleSubmit} title="Save" disabled={!isValid} loading={isSubmitting} />
    </PaddedView>
  </PaddedView>
);

ProfileDetailsFormWithoutData.propTypes = {
  fieldValueSetter: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    nickName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    campusId: PropTypes.string,
  }),
  fieldTouchedSetter: PropTypes.func,
  errors: PropTypes.shape({
    nickName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
    campusId: PropTypes.string,
  }),
  status: PropTypes.string,
  touched: PropTypes.shape({
    nickName: PropTypes.bool,
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    email: PropTypes.bool,
    birthday: PropTypes.bool,
    campusId: PropTypes.bool,
  }),
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  campuses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  ),
};

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required('Nickname is a required field'),
  firstName: Yup.string().required('First Name is a required field'),
  lastName: Yup.string().required('Last Name is a required field'),
  email: Yup.string()
    .email()
    .required('Email is a required field'),
  birthday: Yup.date().required('Birthday is a required field'),
});

const mapPropsToValues = props => ({
  ...(props.user || {}),
  birthday:
    get(props, 'user.birthYear') && get(props, 'user.birthMonth') && get(props, 'user.birthDay')
      ? moment()
        .year(get(props, 'user.birthYear'))
        .month(get(props, 'user.birthMonth') - 1) // .month() is zero based 🙃
        .date(get(props, 'user.birthDay'))
        .toDate()
      : '',
  campusId: get(props, 'user.campus.id') || null,
});

const ProfileDetailsForm = compose(
  withCampuses,
  withUser,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
      try {
        setSubmitting(true);
        const birthMoment = moment(values.birthday);

        await props.updateProfile({
          nickName: values.nickName,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          campus: values.campusId,
          birthMonth: birthMoment.format('M'),
          birthDay: birthMoment.format('D'),
          birthYear: birthMoment.format('YYYY'),
        });
        setStatus('Your information was updated');
      } catch (err) {
        // TODO: Add space for general errors
        // and set via setErrors
        sentry.captureException(err);
        // throw err;
        setStatus('There was an error updating your information. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
    isInitialValid(props) {
      return validationSchema.isValidSync(mapPropsToValues(props));
    },
  }),
  withFieldValueSetter,
  withFieldTouchedSetter,
)(ProfileDetailsFormWithoutData);

export default ProfileDetailsForm;
