import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { Animated, Picker as NativePicker } from 'react-native';
import styled from '@ui/styled';

import InputUnderline from '../InputUnderline';
import InputWrapper from '../InputWrapper';
import FloatingLabel from '../FloatingLabel';
import withInputControlStyles from '../withInputControlStyles';

const enhance = pure;

const StyledNativePicker = compose(
  withInputControlStyles,
  styled({
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    outline: 'none',
  }),
)(NativePicker);

const Picker = enhance(({ wrapperStyle, value, ...props }) => (
  <InputWrapper style={wrapperStyle}>
    <StyledNativePicker {...props} selectedValue={value} prompt={props.placeholder} />
    <FloatingLabel animation={new Animated.Value(1)}>{props.label}</FloatingLabel>
    <InputUnderline />
  </InputWrapper>
));

Picker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  wrapperStyle: PropTypes.any, // eslint-disable-line
  value: PropTypes.any, // eslint-disable-line
};

export default Picker;
export const { Item } = NativePicker;
