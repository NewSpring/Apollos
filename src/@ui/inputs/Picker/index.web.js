import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Animated } from 'react-native';
import styled from '@ui/styled';

import NativePicker from './PickerFromRNWeb'; // todo
import InputUnderline from '../InputUnderline';
import InputWrapper from '../InputWrapper';
import FloatingLabel from '../FloatingLabel';
import withInputControlStyles from '../withInputControlStyles';

const StyledNativePicker = compose(
  withInputControlStyles,
  styled({
    background: 'none',
    border: 'none',
    borderRadius: 0,
    outline: 'none',
  }),
)(NativePicker);

const Picker = props => (
  <InputWrapper>
    <StyledNativePicker {...props} prompt={props.placeholder} />
    <FloatingLabel animation={new Animated.Value(1)}>{props.label}</FloatingLabel>
    <InputUnderline />
  </InputWrapper>
);

Picker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Picker;
export const { Item } = NativePicker;
