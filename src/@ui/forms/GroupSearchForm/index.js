import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { withFormik } from 'formik';
import Yup from 'yup';

import TableView, { FormFields } from '@ui/TableView';
import PaddedView from '@ui/PaddedView';
import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';

import getLocation from '@utils/getLocation';

import FormStatusText from '../FormStatusText';
import KeywordSelect, { keywordIsInQuery, stripKeywordFromQuery } from './KeywordSelect';

const SwitchIcon = compose(
  styled(({ theme }) => ({
    marginRight: theme.sizing.baseUnit / 2,
  })),
  withTheme(({ theme, enabled = false }) => ({
    ...(enabled ? { fill: theme.colors.primary } : {}),
  })),
)(Icon);

const validationSchema = Yup.object().shape({
  query: Yup.string(),
  zipCode: Yup.string(),
  campusId: Yup.string().nullable(),
  useDeviceLocation: Yup.bool(),
}).test('at-least-one-input', 'You must provide at least one input', value =>
  !!(value.query || value.zipCode || value.useDeviceLocation || value.campusId),
);

const mapPropsToValues = () => ({
  useDeviceLocation: true,
  campusId: null, // campuses[0] && campuses[0].name.toLowerCase(),
});

const enhance = compose(
  setPropTypes({
    onSubmit: PropTypes.func,
  }),
  withFormik({
    mapPropsToValues,
    validationSchema,
    isInitialValid(props) {
      return validationSchema.isValidSync(mapPropsToValues(props));
    },
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

      if (values.campusId) query.campus = values.campusId; // NOTE: This is bad
      // query.campuses = [values.campusId] || [];

      query.zip = (values.zipCode && !query.latitude && !query.longitude) ? values.zipCode : null;

      props.onSubmit(query);
      return setSubmitting(false);
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
    <TableView>
      <FormFields>
        <KeywordSelect
          label="Groups I'm looking for..."
          keywords={groupAttributes.map(attr => attr.value)}
          value={values.query}
          onChangeText={value => setFieldValue('query', value)}
          onBlur={() => setFieldTouched('query')}
        />
      </FormFields>
    </TableView>
    <TableView>
      <FormFields>
        <Inputs.Picker
          label="Campus"
          value={values.campusId}
          displayValue={
            get(campuses.find(campus => campus.name.toLowerCase() === values.campusId), 'name') || 'All Locations'
          }
          onValueChange={value => setFieldValue('campusId', value)}
          error={errors.campusId}
        >
          {/* NOTE: value should use id but heighliner doesn't support that yet */}
          <Inputs.PickerItem label="All Locations" value={null} key={'all'} />
          {campuses.map(({ name, id }) => (
            <Inputs.PickerItem label={name} value={name.toLowerCase()} key={id} />
          ))}
        </Inputs.Picker>
        {(!values.useDeviceLocation) ? (
          <Inputs.Text
            label="Zip Code"
            disabled={values.useDeviceLocation}
            type="numeric"
            value={values.zipCode}
            onChangeText={value => setFieldValue('zipCode', value)}
            onBlur={() => setFieldTouched('zipCode')}
            error={touched.zipCode && errors.zipCode}
          />
        ) : null}
        <Inputs.Switch
          prefix={<SwitchIcon enabled={values.useDeviceLocation} name="locate" size={18} />}
          label="Near my location"
          value={values.useDeviceLocation}
          onValueChange={value => setFieldValue('useDeviceLocation', value)}
          error={errors.useDeviceLocation}
        />
      </FormFields>
    </TableView>
    <PaddedView vertical={false}>
      <Button
        onPress={handleSubmit}
        title="Let's Go!"
        type="primary"
        disabled={!isValid}
        loading={isSubmitting}
      />
      {errors.undefined ? (<FormStatusText error>{errors.undefined}</FormStatusText>) : null}
    </PaddedView>
  </View>
));

export default GroupSearchForm;
