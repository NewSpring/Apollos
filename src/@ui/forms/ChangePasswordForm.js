import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import withUser from '@data/withUser';
import { Text as TextInput } from '@ui/inputs';
import PaddedView from '@ui/PaddedView';
import TableView from '@ui/TableView';
import Button from '@ui/Button';

const enhance = compose(
  setPropTypes({
    onChangePasswordSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
  withFormik({
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().required(),
      oldPassword: Yup.string().required(),
    }),
    handleSubmit: async (values, { props, setSubmitting }) => {
      props.onSubmit(values)
        .catch((...e) => {
          console.log('Change Password error', e); // eslint-disable-line
          // todo: show server error messages
        })
        .then((...args) => {
          if (props.onChangePasswordSuccess) props.onChangePasswordSuccess(...args);
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
  <PaddedView horizontal={false}>
    <TableView>
      <PaddedView>
        <TextInput
          label="Current password"
          type="password"
          value={values.oldPassword}
          onChangeText={text => setFieldValue('oldPassword', text)}
          onBlur={() => setFieldTouched('oldPassword', true)}
          error={touched.oldPassword && errors.oldPassword}
        />
        <TextInput
          label="New password"
          type="password"
          value={values.newPassword}
          onChangeText={text => setFieldValue('newPassword', text)}
          onBlur={() => setFieldTouched('newPassword', true)}
          error={touched.newPassword && errors.newPassword}
        />
      </PaddedView>
    </TableView>
    <PaddedView>
      <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
    </PaddedView>
  </PaddedView>
));

const withData = compose(
  withUser,
  withProps(props => ({ onSubmit: props.changePassword })),
);
export default withData(ChangePasswordFormWithoutData);
