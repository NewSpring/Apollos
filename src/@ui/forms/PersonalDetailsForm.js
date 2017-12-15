import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderComponent } from 'recompose';
import get from 'lodash/get';
import ActivityIndicator from '@ui/ActivityIndicator';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    setFieldValue: PropTypes.func,
    handleSubmit: PropTypes.func,
    values: PropTypes.shape({
      campusId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }),
    campuses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    })),
  }),
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

const PersonalDetailsForm = enhance(({
  setFieldValue,
  handleSubmit,
  values,
  campuses,
}) => (
  <View>
    <Inputs.Text
      label="First Name"
      value={values.firstName}
      onChangeText={text => setFieldValue('firstName', text)}
    />
    <Inputs.Text
      label="Last Name"
      value={values.lastName}
      onChangeText={text => setFieldValue('lastName', text)}
    />
    <Inputs.Text
      label="Email"
      value={values.email}
      onChangeText={text => setFieldValue('email', text)}
    />
    <Inputs.Picker
      label="Campus"
      value={values.campusId}
      displayValue={get(campuses.find(campus => campus.id === values.campusId), 'label')}
      onValueChange={value => setFieldValue('campusId', value)}
    >
      {campuses.map(({ label, id }) => (
        <Inputs.PickerItem label={label} value={id} key={id} />
      ))}
    </Inputs.Picker>
    <Button onPress={handleSubmit} title="Next" />
  </View>
));

export default PersonalDetailsForm;
