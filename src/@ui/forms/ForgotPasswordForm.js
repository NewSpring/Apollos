import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import withUser from '@data/withUser';
import { Text as TextInput } from '@ui/inputs';
import Button from '@ui/Button';

const enhance = compose(
  setPropTypes({
    onForgotPasswordSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
  withFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
    }),
    handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
      props.onSubmit(values)
        .catch((...e) => {
          console.log('Forgot Password error', e); // eslint-disable-line
          setFieldError('email', 'Could not find your email'); // todo: show server error messages
        })
        .then((...args) => {
          if (props.onForgotPasswordSuccess) props.onForgotPasswordSuccess(...args);
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

const ChangePasswordFormWithoutData = enhance(({
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
      label="Email"
      type="email"
      value={values.email}
      onChangeText={text => setFieldValue('email', text)}
      onBlur={() => setFieldTouched('email', true)}
      error={touched.email && errors.email}
    />
    <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
  </View>
));

const withData = compose(
  withUser,
  withProps(props => ({ onSubmit: props.forgotPassword })),
);
export default withData(ChangePasswordFormWithoutData);
