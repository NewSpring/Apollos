import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

export default class CreditCardForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit() {},
  };

  state = {
    cardNumber: '',
    expirationDate: '',
    ccv: '',
  }

  get value() {
    return {
      cardNumber: this.state.cardNumber,
      expirationDate: this.state.expirationDate,
      ccv: this.state.ccv,
    };
  }

  handleSubmit = () => {
    this.props.onSubmit(this.value);
  }

  render() {
    return (
      <View>
        <Text>{'Card Number'}</Text>
        <TextInput
          onChangeText={(cardNumber) => { this.setState({ cardNumber }); }}
          value={this.state.cardNumber}
        />

        <Text>{'Expiration Date'}</Text>
        <TextInput
          placeholder="mm/yy"
          onChangeText={(expirationDate) => { this.setState({ expirationDate }); }}
          value={this.state.expirationDate}
        />

        <Text>{'CCV'}</Text>
        <TextInput
          onChangeText={(ccv) => { this.setState({ ccv }); }}
          value={this.state.ccv}
        />

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
