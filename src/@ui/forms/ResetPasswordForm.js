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

const enhance = compose(
  setPropTypes({
    onResetSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
  withFormik({
    validationSchema: Yup.object().shape({
      password: Yup.string().required(),
      token: Yup.string().required(), // todo: Get token from URL flow
    }),
    handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
      props.onSubmit(values)
        .catch((...e) => {
          console.log('Reset password error', e); // eslint-disable-line
          setFieldError('token', true);
          setFieldError('password', true); // todo: show real error message from server
        })
        .then((...args) => {
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
}) => (
  <View>
    <TextInput
      label="Token"
      autoCorrect={false}
      value={values.token}
      onChangeText={text => setFieldValue('token', text)}
      onBlur={() => setFieldTouched('token', true)}
      error={touched.token && errors.token}
    />
    <TextInput
      label="New Password"
      type="password"
      value={values.password}
      onChangeText={text => setFieldValue('password', text)}
      onBlur={() => setFieldTouched('password', true)}
      error={touched.password && errors.password}
    />
    <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
  </View>
));

const withData = compose(
  withUser,
  mapProps(props => ({ ...props, onSubmit: props.resetPassword })),
);
export default withData(ChangePasswordFormWithoutData);
