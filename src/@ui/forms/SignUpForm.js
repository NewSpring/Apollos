import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { compose, withProps, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import { withRouter, goBackTo } from '@ui/NativeWebRouter';
import withUser from '@data/withUser';
import { Text as TextInput } from '@ui/inputs';
import Button from '@ui/Button';

const enhance = compose(
  setPropTypes({
    onSignupSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
    email: PropTypes.string,
  }),
  withRouter,
  withFormik({
    mapPropsToValues: ({ email }) => ({ email }),
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
    }),
    handleSubmit: async (values, { props, setSubmitting }) => {
      try {
        const result = await props.onSubmit(values);
        if (props.onSignupSuccess) props.onSignupSuccess(result);

        const referrer = get(props, 'location.state.referrer');
        if (referrer) return goBackTo({ to: referrer, history: props.history, replace: true });
      } catch (e) {
        // todo: show error message from server
      }

      return setSubmitting(false);
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

const SignUpFormWithoutData = enhance(({
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
    <TextInput
      label="First Name"
      value={values.firstName}
      onChangeText={text => setFieldValue('firstName', text)}
      onBlur={() => setFieldTouched('firstName', true)}
      error={touched.firstName && errors.firstName}
    />
    <TextInput
      label="Last Name"
      value={values.lastName}
      onChangeText={text => setFieldValue('lastName', text)}
      onBlur={() => setFieldTouched('lastName', true)}
      error={touched.lastName && errors.lastName}
    />
    <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
  </View>
));

const withData = compose(
  withUser,
  withProps(props => ({ onSubmit: props.register })),
);
export default withData(SignUpFormWithoutData);
