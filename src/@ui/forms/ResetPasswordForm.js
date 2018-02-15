import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import withUser from '@data/withUser';
import { Text as TextInput } from '@ui/inputs';
import Button from '@ui/Button';
import Status from './FormStatusText';

const enhance = compose(
  setPropTypes({
    onResetSuccess: PropTypes.func,
    resetPassword: PropTypes.func,
    token: PropTypes.string,
  }),
  withFormik({
    validationSchema: Yup.object().shape({
      password: Yup.string().required(),
      passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null])
        .required('Password confirm is required'),
    }),
    handleSubmit: async (values, {
      props, setFieldError, setSubmitting, setStatus,
    }) => {
      props.resetPassword({ token: props.token, newPassword: values.password })
        .catch((...e) => {
          setStatus('There was an error resetting your password.');
          console.log('Reset password error', e); // eslint-disable-line
          setFieldError('password', true); // todo: show real error message from server
        })
        .then((...args) => {
          setStatus('Your password was reset');
          if (props.onResetSuccess) props.onResetSuccess(...args);
        })
        .finally(() => setSubmitting(false));
    },
  }),
  setPropTypes({
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
    status: PropTypes.string,
  }),
);

export const ChangePasswordFormWithoutData = enhance(({
  setFieldTouched,
  setFieldValue,
  touched,
  errors,
  values,
  handleSubmit,
  isValid,
  isSubmitting,
  status,
}) => (
  <View>
    <TextInput
      label="New Password"
      type="password"
      value={values.password}
      onChangeText={text => setFieldValue('password', text)}
      onBlur={() => setFieldTouched('password', true)}
      error={touched.password && errors.password}
    />
    <TextInput
      label="Confirm Password (enter it again)"
      type="password"
      value={values.passwordConfirm}
      onChangeText={text => setFieldValue('passwordConfirm', text)}
      onBlur={() => setFieldTouched('passwordConfirm', true)}
      error={touched.passwordConfirm && errors.passwordConfirm}
    />
    {status ? (
      <Status>{status}</Status>
    ) : null}
    <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
  </View>
));

const withData = compose(
  withUser,
  mapProps(props => ({ ...props, onSubmit: props.resetPassword })),
);
export default withData(ChangePasswordFormWithoutData);
