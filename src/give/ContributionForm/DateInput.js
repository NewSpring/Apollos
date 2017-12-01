import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import moment from 'moment';

export default class DateInput extends Component {
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
