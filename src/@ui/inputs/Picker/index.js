import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Picker as NativePicker, TouchableOpacity } from 'react-native';
import styled from '@ui/styled';

import { H6 } from '@ui/typography';
import Icon from '@ui/Icon';

import FloatingLabel from '../FloatingLabel';
import InputUnderline from '../InputUnderline';
import InputWrapper from '../InputWrapper';
import withFocusAnimation from '../withFocusAnimation';

import InputAddon, { AddonRow } from '../InputAddon';
import withInputControlStyles from '../withInputControlStyles';

import PickerList from './PickerList';

const StyledH6 = withInputControlStyles(H6);
const Placeholder = styled(({ theme }) => ({
  color: theme.colors.input.placeholder,
}), 'Inputs.Picker.Placeholder')(H6);

class Picker extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    displayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    focusAnimation: PropTypes.any, // eslint-disable-line
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.any, // eslint-disable-line
    wrapperStyle: PropTypes.any, // eslint-disable-line
    style: PropTypes.any, // eslint-disable-line
  };

  state = {
    focused: false,
  };

  toggle = () => {
    const focused = !this.state.focused;
    this.setState({ focused }, () => {
      if (focused) {
        this.props.onFocus();
      } else {
        this.props.onBlur();
      }
    });
  }

  render() {
    const {
      displayValue,
      focusAnimation, // from createInput
      placeholder,
      label,
      value,
      style,
      wrapperStyle,
      ...pickerProps
    } = this.props;
    const rotate = focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    const labelAnimation = value ? new Animated.Value(1) : focusAnimation;
    return (
      <InputWrapper style={wrapperStyle}>
        <TouchableOpacity onPress={this.toggle}>
          <AddonRow>
            <Animated.View style={{ opacity: labelAnimation, flex: 1 }}>
              <StyledH6 style={style}>
                {displayValue || (<Placeholder>{placeholder}</Placeholder>)}
              </StyledH6>
            </Animated.View>
            <InputAddon>
              <Animated.View style={{ transform: [{ rotate }] }}>
                <Icon name="arrow-down" size={18} />
              </Animated.View>
            </InputAddon>
          </AddonRow>
        </TouchableOpacity>

        <PickerList
          {...pickerProps}
          value={value}
          focused={this.state.focused}
          onRequestClose={this.toggle}
        />

        <FloatingLabel animation={labelAnimation}>{label}</FloatingLabel>
        <InputUnderline animation={focusAnimation} />
      </InputWrapper>
    );
  }
}

const EnhancedComponent = withFocusAnimation(Picker);
EnhancedComponent.propTypes = Picker.propTypes;

export default EnhancedComponent;
export const { Item } = NativePicker;
