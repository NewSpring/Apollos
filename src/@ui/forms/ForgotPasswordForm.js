import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import withUser from '@data/withUser';
import { Text as TextInput } from '@ui/inputs';
import Button from '@ui/Button';
import sentry from '@utils/sentry';

import { withFieldValueHandler, withFieldTouchedHandler } from './formikSetters';

import Status from './FormStatusText';

const enhance = compose(
  setPropTypes({
    onForgotPasswordSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
  withFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Email is a required field'),
    }),
    handleSubmit: async (values, {
      props, setFieldError, setStatus, setSubmitting,
    }) => {
      props
        .onSubmit(values)
        .then((...args) => {
          setStatus(
            `An email has been sent to ${
              values.email
            } with further instructions to reset your password.`,
          );
          if (props.onForgotPasswordSuccess) props.onForgotPasswordSuccess(...args);
        })
        .catch((...e) => {
          sentry.captureException(e);
          setStatus(null);
          setFieldError('email', 'Could not find your email'); // todo: show server error messages
        })
        .finally(() => setSubmitting(false));
    },
  }),
  withFieldValueHandler,
  withFieldTouchedHandler,
  setPropTypes({
    createFieldTouchedHandler: PropTypes.func,
    createFieldValueHandler: PropTypes.func,
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
  }),
);

const ChangePasswordFormWithoutData = enhance(
  ({
    createFieldTouchedHandler,
    createFieldValueHandler,
    touched,
    errors,
    values,
    handleSubmit,
    isValid,
    isSubmitting,
    status,
  }) => (
    <View>
      <Status>{'Confirm your email to send the reset link.'}</Status>
      <Status>
        {"If you don't get a reset email within 5 minutes, please check your spam folders."}
      </Status>
      <TextInput
        label="Email"
        type="email"
        value={values.email}
        onChangeText={createFieldValueHandler('email')}
        onBlur={createFieldTouchedHandler('email')}
        error={touched.email && errors.email}
      />
      {status ? <Status>{status}</Status> : null}
      <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
    </View>
  ),
);

const withData = compose(withUser, withProps(props => ({ onSubmit: props.forgotPassword })));
export default withData(ChangePasswordFormWithoutData);
