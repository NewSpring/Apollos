import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

export default class Radio extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    initialValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    children: null,
    onChange() {},
    initialValue: null,
  };

  static childContextTypes = {
    onSelectValue: PropTypes.func,
    currentValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static Button = RadioButton;

  state = {
    value: this.props.initialValue,
  };

  getChildContext() {
    return {
      onSelectValue: this.selectValue,
      currentValue: this.state.value,
    };
  }

  selectValue = (value) => {
    this.setState({
      value,
    }, this.notifyValueChanged);
  }

  notifyValueChanged = () => {
    this.props.onChange(this.state.value);
  };

  render() {
    return (
      <View>
        {this.props.children}
      </View>
    );
  }
}
