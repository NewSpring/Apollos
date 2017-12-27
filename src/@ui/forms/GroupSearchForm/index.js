import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

import getLocation from '@utils/getLocation';

import KeywordSelect, { keywordIsInQuery, stripKeywordFromQuery } from './KeywordSelect';

const enhance = compose(
  setPropTypes({
    onSubmit: PropTypes.func,
  }),
  withFormik({
    mapPropsToValues: () => ({
      useDeviceLocation: true,
    }),
    validationSchema: Yup.object().shape({
      query: Yup.string(),
      campusId: Yup.string(),
      zipCode: Yup.string(),
      useDeviceLocation: Yup.bool(),
    }),
    isInitialValid: true,
    handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
      const tags = [];
      let q = values.query || '';

      props.groupAttributes.forEach((attr) => {
        if (keywordIsInQuery(q, attr.value)) {
          q = stripKeywordFromQuery(q, attr.value);
          tags.push(attr.value);
        }
      });

      q = q.replace(/(and)|(or)|(the)|(from)|(also)|(friendly)|(with)/g, '').trim(', ');

      const query = {};

      if (q && q.length) query.q = q;
      if (tags.length) query.tags = tags.map(t => t.toLowerCase());

      if (values.useDeviceLocation) {
        try {
          const { coords = {} } = await getLocation();
          if (coords.latitude) query.latitude = coords.latitude;
          if (coords.longitude) query.longitude = coords.longitude;
        } catch (e) {
          setFieldError('useDeviceLocation', 'Could not find your location');
          return setSubmitting(false);
        }
      }

      query.campus = values.campusId || null;
      query.zip = (values.zipCode && !query.latitude && !query.longitude) ? values.zipCode : null;

      return props.onSubmit(query);
    },
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
  isValid,
  isSubmitting,
}) => (
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
    <Button onPress={handleSubmit} title="Let's Go!" type="primary" disabled={!isValid} loading={isSubmitting} />
  </View>
));

export default GroupSearchForm;
