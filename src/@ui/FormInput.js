import React from 'react';
import {
  View,
  TextInput,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

function FormInput(props = {}) {
  const {
    label = '',
    ...otherProps
  } = props;

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        {...otherProps}
      />
    </View>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
};

FormInput.defaultProps = {
  label: '',
};

export default FormInput;
