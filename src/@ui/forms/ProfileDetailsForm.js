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

export const ProfileDetailsFormWithoutData = ({
  setFieldValue,
  handleSubmit,
  values,
  campuses = [],
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
          label="Nickname"
          value={values.nickName}
          onChangeText={text => setFieldValue('nickName', text)}
          onBlur={() => setFieldTouched('nickName', true)}
          error={Boolean(touched.nickName && errors.nickName)}
        />
        <Inputs.Text
          label="First Name"
          value={values.firstName}
          onChangeText={text => setFieldValue('firstName', text)}
          onBlur={() => setFieldTouched('firstName', true)}
          error={Boolean(touched.firstName && errors.firstName)}
        />
        <Inputs.Text
          label="Last Name"
          value={values.lastName}
          onChangeText={text => setFieldValue('lastName', text)}
          onBlur={() => setFieldTouched('lastName', true)}
          error={Boolean(touched.lastName && errors.lastName)}
        />
      </PaddedView>
    </TableView>
    <TableView>
      <PaddedView>
        <Inputs.Text
          label="Email"
          value={values.email}
          onChangeText={text => setFieldValue('email', text)}
          onBlur={() => setFieldTouched('email', true)}
          error={Boolean(touched.email && errors.email)}
        />
      </PaddedView>
    </TableView>
    <TableView>
      <PaddedView>
        <Inputs.DateInput
          label="Birthday"
          value={values.birthday}
          onChange={text => setFieldValue('birthday', text)}
          onBlur={() => setFieldTouched('birthday', true)}
          error={Boolean(touched.birthday && errors.birthday)}
        />
      </PaddedView>
    </TableView>
    <TableView>
      <PaddedView>
        <Inputs.Picker
          label="Campus"
          value={values.campusId}
          displayValue={get(campuses.find(campus => campus.id === values.campusId), 'name')}
          onValueChange={value => setFieldValue('campusId', value)}
          error={errors.campusId}
        >
          {campuses.map(({ name, id }) => (
            <Inputs.PickerItem label={name} value={id} key={id} />
          ))}
        </Inputs.Picker>
      </PaddedView>
    </TableView>
    <PaddedView>
      <Button onPress={handleSubmit} title="Save" disabled={!isValid} loading={isSubmitting} />
    </PaddedView>
  </PaddedView>
);

ProfileDetailsFormWithoutData.propTypes = {
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    nickName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
    campusId: PropTypes.string,
  }),
  setFieldTouched: PropTypes.func,
  errors: PropTypes.shape({
    nickName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
    campusId: PropTypes.string,
  }),
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
  campuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
  })),
};

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  birthday: Yup.date().required(),
});

const mapPropsToValues = props => ({
  ...(props.user || {}),
  birthday: moment()
    .year(get(props, 'user.birthYear', moment().year()))
    .month(get(props, 'user.birthMonth', moment().month() + 1) - 1)
    .date(get(props, 'user.birthDay', moment().date()))
    .toDate(),
  campusId: get(props, 'user.campus.id') || null,
});

const ProfileDetailsForm = compose(
  withCampuses,
  withUser,
  branch(({ isLoading }) => isLoading,
    renderComponent(ActivityIndicator),
  ),
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: async (values, { props, setSubmitting }) => {
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
      } catch (err) {
        // TODO: Add space for general errors
        // and set via setErrors
        console.log(err);
        // throw err;
      } finally {
        setSubmitting(false);
      }
    },
    isInitialValid(props) {
      return validationSchema
        .isValidSync(mapPropsToValues(props));
    },
  }),
)(ProfileDetailsFormWithoutData);

export default ProfileDetailsForm;
