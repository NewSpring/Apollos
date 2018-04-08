import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

export default class Radio extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {
    children: null,
    onChange() {},
    value: null,
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
    value: this.props.value,
  };

  getChildContext() {
    return {
      onSelectValue: this.selectValue,
      currentValue: this.state.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      }, this.notifyValueChanged);
    }
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
      <View style={this.props.style}>
        {this.props.children}
      </View>
    );
  }
}
