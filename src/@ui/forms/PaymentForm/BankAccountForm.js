import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  isEqual,
  pick,
} from 'lodash';
import Picker from '@ui/Picker';

export default class BankAccountForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    routingNumber: PropTypes.string,
    accountNumber: PropTypes.string,
    accountType: PropTypes.oneOf(['checking', 'savings']),
    accountName: PropTypes.string,
  };

  static defaultProps = {
    onSubmit() {},
    routingNumber: '',
    accountNumber: '',
    accountType: 'checking',
    accountName: '',
  };

  state = {
    routingNumber: this.props.routingNumber,
    accountNumber: this.props.accountNumber,
    accountType: this.props.accountType,
    accountName: this.props.accountName,
  }

  componentWillReceiveProps(nextProps) {
    const propTypeKeys = [
      'routingNumber',
      'accountNumber',
      'accountType',
      'accountName',
    ];

    const didChange = !isEqual(pick(nextProps, propTypeKeys), pick(this.props, propTypeKeys));
    if (didChange) {
      this.setState({
        routingNumber: nextProps.routingNumber,
        accountNumber: nextProps.accountNumber,
        accountType: nextProps.accountType,
        accountName: nextProps.accountName,
      });
    }
  }

  get value() {
    return {
      routingNumber: this.state.routingNumber,
      accountNumber: this.state.accountNumber,
      accountType: this.state.accountType,
      accountName: this.state.accountName,
    };
  }

  handleSubmit = () => {
    this.props.onSubmit(this.value);
  }

  render() {
    return (
      <View>
        <Text>{'Account Holder Name'}</Text>
        <TextInput
          onChangeText={(accountName) => { this.setState({ accountName }); }}
          value={this.state.accountName}
        />

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
