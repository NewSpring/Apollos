import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import FloatingLabel from './FloatingLabel';
import InputUnderline from './InputUnderline';
import InputWrapper from './InputWrapper';

// helper HOC to wrap an Input in a floating label and animated underline
const createInput = Component => (
  class WrappedInput extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      focusAnimationDuration: PropTypes.number,
      focusAnimationEasing: PropTypes.func,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      value: PropTypes.string,
    };

    static defaultProps = {
      focusAnimationDuration: 450,
      focusAnimationEasing: Easing.in(Easing.bezier(0.23, 1, 0.32, 1)),
    }

    componentWillReceiveProps(newProps) {
      if (newProps.value !== this.props.value && !this.focused) {
        this.playAnimation(newProps.value ? 1 : 0);
      }
    }

    focusAnimation = new Animated.Value(this.props.value ? 1 : 0);

    playAnimation = (toValue) => {
      Animated.timing(this.focusAnimation, {
        toValue,
        duration: this.props.focusAnimationDuration,
        easing: this.props.focusAnimationEasing,
        // useNativeDriver: true,
      }).start();
    };

    handleFocus = (...args) => {
      if (this.props.onFocus) this.props.onFocus(...args);
      this.focused = true;
      this.playAnimation(1);
    }

    handleBlur = (event, ...other) => {
      if (this.props.onBlur) this.props.onBlur(event, ...other);
      this.focused = false;
      this.playAnimation(get(event, 'nativeEvent.text') || this.props.value ? 1 : 0);
    }

    render() {
      return (
        <InputWrapper>
          <Component
            {...this.props}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            focusAnimation={this.focusAnimation}
          />
          <FloatingLabel animation={this.focusAnimation}>{this.props.label}</FloatingLabel>
          <InputUnderline animation={this.focusAnimation} />
        </InputWrapper>
      );
    }
  }
);

export default createInput;
