import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps, setPropTypes } from 'recompose';
import { get } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';

import withUser from '@data/withUser';
import { Text as TextInput } from '@ui/inputs';
import Button, { ButtonLink } from '@ui/Button';
import { withRouter, goBackTo } from '@ui/NativeWebRouter';
import { H7 } from '@ui/typography';
import styled from '@ui/styled';

import { withFieldValueHandler, withFieldTouchedHandler } from './formikSetters';


const ForgotPasswordText = styled(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: theme.sizing.baseUnit,
}))(H7);
const ForgotPasswordLink = withRouter(({ history }) => (
  <ForgotPasswordText>
    <ButtonLink onPress={() => history.push('/forgot-password')}>Forgot Password?</ButtonLink>
  </ForgotPasswordText>
));

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
      email: Yup.string()
        .email()
        .required('Email is a required field'),
      password: Yup.string().required('Password is a required field'),
    }),
    handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
      try {
        const result = await props.onSubmit(values);
        if (props.onLoginSuccess) props.onLoginSuccess(result);

        const referrer = get(props, 'location.state.referrer');
        if (referrer) return goBackTo({ to: referrer, history: props.history, replace: true });
        return goBackTo({ to: '/give/now', history: props.history });
      } catch (e) {
        setFieldError('email', true);
        setFieldError('password', 'Your email or password is incorrect'); // todo: show real error message from server
      }

      return setSubmitting(false);
    },
  }),
  withFieldValueHandler,
  withFieldTouchedHandler,
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

export const LoginFormWithoutData = enhance(
  ({
    createFieldTouchedHandler,
    createFieldValueHandler,
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
        onChangeText={createFieldValueHandler('email')}
        onBlur={createFieldTouchedHandler('email')}
        error={touched.email && errors.email}
      />
      <TextInput
        label="Password"
        type="password"
        value={values.password}
        onChangeText={createFieldValueHandler('password')}
        onBlur={createFieldTouchedHandler('password')}
        error={touched.password && errors.password}
      />
      <ForgotPasswordLink />
      <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
    </View>
  ),
);

const withData = compose(withUser, mapProps(props => ({ ...props, onSubmit: props.login })));
export default withData(LoginFormWithoutData);
