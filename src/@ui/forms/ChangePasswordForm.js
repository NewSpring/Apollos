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
import { H6 } from '@ui/typography';
import styled from '@ui/styled';
import sentry from '@utils/sentry';

import { withFieldValueHandler, withFieldTouchedHandler } from './formikSetters';

const Status = styled({ textAlign: 'center' })(H6);

const enhance = compose(
  setPropTypes({
    onChangePasswordSuccess: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
  withFormik({
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().required('New password is a required field'),
      oldPassword: Yup.string().required('Current password is a required field'),
    }),
    handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
      props
        .onSubmit(values)
        .catch((...e) => {
          setStatus('Please make sure your password is correct and try again');
          sentry.captureException(e);
          // todo: show server error messages
        })
        .then((...args) => {
          setStatus('Your password was updated.');
          if (props.onChangePasswordSuccess) props.onChangePasswordSuccess(...args);
        })
        .finally(() => setSubmitting(false));
    },
  }),
  withFieldValueHandler,
  withFieldTouchedHandler,
  setPropTypes({
    createFieldValueHandler: PropTypes.func,
    createFieldTouchedHandler: PropTypes.func,
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
    status: PropTypes.string,
  }),
);

const ChangePasswordFormWithoutData = enhance(
  ({
    createFieldValueHandler,
    createFieldTouchedHandler,
    touched,
    errors,
    values,
    handleSubmit,
    isValid,
    isSubmitting,
    status,
  }) => (
    <PaddedView horizontal={false}>
      <TableView>
        <PaddedView>
          <TextInput
            label="Current password"
            type="password"
            value={values.oldPassword}
            onChangeText={createFieldValueHandler('oldPassword')}
            onBlur={createFieldTouchedHandler('oldPassword')}
            error={touched.oldPassword && errors.oldPassword}
          />
          <TextInput
            label="New password"
            type="password"
            value={values.newPassword}
            onChangeText={createFieldValueHandler('newPassword')}
            onBlur={createFieldTouchedHandler('newPassword')}
            error={touched.newPassword && errors.newPassword}
          />
        </PaddedView>
      </TableView>
      {status ? <Status>{status}</Status> : null}
      <PaddedView>
        <Button onPress={handleSubmit} title="Go" disabled={!isValid} loading={isSubmitting} />
      </PaddedView>
    </PaddedView>
  ),
);

const withData = compose(withUser, withProps(props => ({ onSubmit: props.changePassword })));
export default withData(ChangePasswordFormWithoutData);
