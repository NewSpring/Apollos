import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

import KeywordSelect from './KeywordSelect';

const enhance = compose(
  withFormik({
    mapPropsToValues: () => ({
      useDeviceLocation: true,
    }),
    validationSchema: Yup.object().shape({
      query: Yup.array().of(Yup.string()),
      campusId: Yup.string(),
      zipCode: Yup.string(),
      useDeviceLocation: Yup.bool(),
    }),
  }),
  setPropTypes({
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    campuses: PropTypes.arrayOf(PropTypes.shape({})),
    groupAttributes: PropTypes.arrayOf(PropTypes.shape({})),
    handleSubmit: PropTypes.func,
  }),
);

export const GroupSearchForm = enhance(({
  setFieldTouched,
  setFieldValue,
  touched,
  errors,
  values,
  campuses = [],
  groupAttributes = [],
  handleSubmit,
}) => console.log({ groupAttributes }) || (
  <View>
    <KeywordSelect
      label="Groups I'm looking for..."
      keywords={groupAttributes.map(attr => attr.value)}
      value={values.query}
      onChangeText={value => setFieldValue('query', value)}
      onBlur={() => setFieldTouched('query')}
    />
    <Inputs.Picker
      label="Campus"
      value={values.campusId}
      displayValue={get(campuses.find(campus => campus.id === values.campusId), 'name')}
      onValueChange={value => setFieldValue('campusId', value)}
      error={errors.campusId}
    >
      {campuses.map(({ name, id }) => (
        <Inputs.PickerItem label={name} value={id} key={id} />
      ))}
    </Inputs.Picker>
    <Inputs.Text
      label="Zip Code"
      disabled={values.useDeviceLocation}
      type="numeric"
      value={values.zipCode}
      onChangeText={value => setFieldValue('zipCode', value)}
      onBlur={() => setFieldTouched('zipCode')}
      error={touched.zipCode && errors.zipCode}
    />
    <Inputs.Switch
      label="Use my current location"
      value={values.useDeviceLocation}
      onValueChange={value => setFieldValue('useDeviceLocation', value)}
      error={errors.useDeviceLocation}
    />
    <Button title="Let's Go!" onPress={handleSubmit} type="primary" />
  </View>
));

export default GroupSearchForm;
