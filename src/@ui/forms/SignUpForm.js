import React from 'react';
import { Linking, View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { compose, withProps, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import { withRouter, goBackTo } from '@ui/NativeWebRouter';
import withUser from '@data/withUser';
import { Text as TextInput, Switch } from '@ui/inputs';
import { LabelText } from '@ui/inputs/FloatingLabel';
import Button, { ButtonLink } from '@ui/Button';

import Status from './FormStatusText';

const tocLabel = (
  <LabelText>
    {'I agree to the '}
    <ButtonLink onPress={() => Linking.openURL('https://newspring.cc/terms')}>
      terms of service
    </ButtonLink>.
  </LabelText>
);

const UserExistsStatus = withRouter(({ history }) => (
  <Status error>
    {"A user already exists with that email, but the password doesn't match. Would you like to "}
    <ButtonLink onPress={() => history.push('/forgot-password')}>reset your password?</ButtonLink>
  </Status>
));

const UnknownErrorStatus = (
  <Status error>An error occured. Please double check your information and try again later.</Status>
);

const enhance = compose(
  setPropTypes({
    onSignupSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
    email: PropTypes.string,
  }),
  withRouter,
  withFormik({
    mapPropsToValues: ({ email }) => ({ email, terms: true }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Email is a required field'),
      password: Yup.string().required('Password is a required field'),
      firstName: Yup.string().required('First Name is a required field'),
      lastName: Yup.string().required('Last Name is a required field'),
      terms: Yup.boolean()
        .oneOf([true, null], 'You must agree to the terms to create an account')
        .required(),
    }),
    handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
      let result = null;
      let success = false;
      try {
        result = await props.onSubmit(values);
        success = true;
      } catch (e) {
        if (e.message.indexOf('User already exists') > -1) {
          // try to log user in:
          if (props.login) {
            try {
              result = await props.login(values);
              success = true;
            } catch (e2) {
              setStatus(UserExistsStatus);
            }
          }
        } else {
          setStatus(UnknownErrorStatus);
        }
      }

      if (success) {
        setStatus(null);
        if (props.onSignupSuccess) props.onSignupSuccess(result);
        const referrer = get(props, 'location.state.referrer');
        if (referrer) return goBackTo({ to: referrer, history: props.history, replace: true });
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

const SignUpFormWithoutData = enhance(
  ({
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
      <Switch
        label={tocLabel}
        value={values.terms}
        onValueChange={v => setFieldValue('terms', v)}
        error={errors.terms}
      />
      {status ? React.createElement(status) : null}
      <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
    </View>
  ),
);

const withData = compose(withUser, withProps(props => ({ onSubmit: props.register })));
export default withData(SignUpFormWithoutData);
