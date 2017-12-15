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

export default class CreditCardForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    cardNumber: PropTypes.string,
    expirationDate: PropTypes.string,
    cvv: PropTypes.string,
  };

  static defaultProps = {
    onSubmit() {},
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };

  state = {
    cardNumber: this.props.cardNumber,
    expirationDate: this.props.expirationDate,
    cvv: this.props.cvv,
  }

  componentWillReceiveProps(nextProps) {
    const propTypeKeys = [
      'cardNumber',
      'expirationDate',
      'cvv',
    ];

    const didChange = !isEqual(pick(nextProps, propTypeKeys), pick(this.props, propTypeKeys));
    if (didChange) {
      this.setState({
        cardNumber: nextProps.cardNumber,
        expirationDate: nextProps.expirationDate,
        cvv: nextProps.cvv,
      });
    }
  }

  get value() {
    return {
      cardNumber: this.state.cardNumber,
      expirationDate: this.state.expirationDate,
      cvv: this.state.cvv,
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

        <Text>{'CVV'}</Text>
        <TextInput
          onChangeText={(cvv) => { this.setState({ cvv }); }}
          value={this.state.cvv}
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
