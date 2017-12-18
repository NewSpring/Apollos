import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Picker as NativePicker } from 'react-native';
import { mapProps } from 'recompose';

import InputUnderline from '../InputUnderline';
import InputWrapper from '../InputWrapper';
import FloatingLabel from '../FloatingLabel';

const MappedNativePicker = mapProps(({
  placeholder: prompt,
  value: selectedValue,
  ...otherProps
}) => ({
  prompt,
  selectedValue,
  ...otherProps,
}))(NativePicker);

const Picker = props => (
  <InputWrapper>
    <MappedNativePicker {...props} />
    <FloatingLabel animation={new Animated.Value(1)}>{props.label}</FloatingLabel>
    <InputUnderline />
  </InputWrapper>
);

Picker.propTypes = {
  label: PropTypes.string,
};

export default Picker;
export const { Item } = NativePicker;
