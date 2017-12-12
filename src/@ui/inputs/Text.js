import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Animated, Easing } from 'react-native';
import styled from '@ui/styled';

import FloatingLabel from './FloatingLabel';
import InputUnderline from './InputUnderline';
import InputAddon from './InputAddon';
import InputWrapper, { InputRow } from './InputWrapper';

const StyledTextInput = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
}), 'Input.Text.TextInput')(TextInput);

class Text extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    animationDuration: PropTypes.number,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
  };

  static defaultProps = {
    animationDuration: 450,
  }

  focusAnimation = new Animated.Value(0);

  playAnimation = (toValue) => {
    Animated.timing(this.focusAnimation, {
      toValue,
      duration: this.props.animationDuration,
      easing: Easing.in(Easing.bezier(0.23, 1, 0.32, 1)),
      useNativeDriver: true,
    }).start();
  };

  handleFocus = (...args) => {
    if (this.props.onFocus) this.props.onFocus(...args);
    this.playAnimation(1);
  }

  handleBlur = (...args) => {
    if (this.props.onBlur) this.props.onBlur(...args);
    this.playAnimation(0);
  }

  render() {
    const {
      label,
      animationDuration,
      prefix,
      suffix,
      ...textInputProps
    } = this.props;
    return (
      <InputWrapper>
        <InputRow>
          <InputAddon>{this.props.prefix}</InputAddon>
          <Animated.View style={{ opacity: this.focusAnimation, flex: 1 }}>
            <StyledTextInput
              {...textInputProps}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </Animated.View>
          <InputAddon>{this.props.suffix}</InputAddon>
        </InputRow>
        <FloatingLabel animation={this.focusAnimation}>{label}</FloatingLabel>
        <InputUnderline animation={this.focusAnimation} />
      </InputWrapper>
    );
  }
}

export default Text;
