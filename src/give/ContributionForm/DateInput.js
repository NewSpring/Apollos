import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DateInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange() {},
  };

  state = {
    value: moment().format('MM/DD/YYYY'),
  };

  get value() {
    const date = new Date(this.state.value);
    return {
      date,
    };
  }

  setValue = (value) => {
    this.setState({
      value,
    }, () => {
      this.props.onChange(this.value);
    });
  }

  render() {
    return (
      <View>
        <Text>{'Start Date'}</Text>
        <TextInput
          placeholder="mm/dd/yyyy"
          onChangeText={this.setValue}
          value={this.state.value}
        />
      </View>
    );
  }
}
