import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps, setPropTypes } from 'recompose';
import { get } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';

import withUser from '@data/withUser';
import { Text as TextInput } from '@ui/inputs';
import Button from '@ui/Button';
import { withRouter, goBackTo } from '@ui/NativeWebRouter';

const enhance = compose(
  setPropTypes({
    email: PropTypes.string,
    onLoginSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
  withRouter,
  withFormik({
    mapPropsToValues: ({ email }) => ({
      email,
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
      try {
        const result = await props.onSubmit(values);
        if (props.onLoginSuccess) props.onLoginSuccess(result);

        const referrer = get(props, 'location.state.referrer');
        if (referrer) goBackTo({ to: referrer, history: props.history, replace: true });
      } catch (e) {
        setFieldError('email', true);
        setFieldError('password', 'Your email or password is incorrect'); // todo: show real error message from server
      }

      setSubmitting(false);
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

export const LoginFormWithoutData = enhance(({
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
    <TextInput
      label="Password"
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
  mapProps(props => ({ ...props, onSubmit: props.login })),
);
export default withData(LoginFormWithoutData);
