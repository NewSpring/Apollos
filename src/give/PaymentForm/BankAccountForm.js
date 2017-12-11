import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Picker from '@ui/Picker';

export default class BankAccountForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit() {},
  };

  state = {
    routingNumber: '',
    accountNumber: '',
    accountType: '',
  }

  get value() {
    return {
      routingNumber: this.state.routingNumber,
      accountNumber: this.state.accountNumber,
      accountType: this.state.accountType,
    };
  }

  handleSubmit = () => {
    this.props.onSubmit(this.value);
  }

  render() {
    return (
      <View>
        <Text>{'Routing Number'}</Text>
        <TextInput
          onChangeText={(routingNumber) => { this.setState({ routingNumber }); }}
          value={this.state.routingNumber}
        />

        <Text>{'Account Number'}</Text>
        <TextInput
          onChangeText={(accountNumber) => { this.setState({ accountNumber }); }}
          value={this.state.accountNumber}
        />

        <Picker
          onValueChange={(accountType) => { this.setState({ accountType }); }}
          selectedValue={this.state.accountType}
        >
          <Picker.Item label="Checking" value="checking" key="checking" />
          <Picker.Item label="Savings" value="savings" key="savings" />
        </Picker>

        <TouchableHighlight
          onPress={this.handleSubmit}
        >
          <View style={{ padding: 10 }}>
            <Text>{'Next'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
