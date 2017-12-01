import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import Picker from '@primitives/Picker';
import PropTypes from 'prop-types';
import isBlank from '@utils/isBlank';

export default class FundInput extends Component {
  static propTypes = {
    funds: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
    isFirst: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    funds: [],
    isFirst: false,
    onChange() {},
  };

  state = {
    id: '',
    amount: '',
  };

  get value() {
    return {
      amount: this.amount,
      id: this.id,
    };
  }

  get amount() {
    // eslint-disable-next-line
    return parseFloat(this.state.amount.match(/[\d\.]+/)) || 0;
  }

  get id() {
    const {
      id,
    } = this.state;

    return isBlank(id) ? this.props.funds[0].id : id;
  }

  setContributionAmount = (value) => {
    const amount = value.replace(/[^0-9.]/g, '');

    this.setState({
      amount,
    }, () => {
      this.props.onChange(this.value);
    });
  }

  setTargetFund = (id, idx) => {
    const { id: fundId } = this.props.funds[idx];
    this.setState({ id: fundId }, () => {
      this.props.onChange(this.value);
    });
  }

  render() {
    return (
      <View>
        <Text>{this.props.isFirst ? 'I\'d like to give' : 'and give'}</Text>
        <TextInput
          placeholder="0.00"
          onChangeText={this.setContributionAmount}
          value={this.state.amount}
        />
        <Text>{'to'}</Text>
        <Picker
          onValueChange={this.setTargetFund}
          selectedValue={this.state.id}
        >
          {this.props.funds.map(({ name, id }) => (
            <Picker.Item label={name} value={id} key={id} />
          ))}
        </Picker>
      </View>
    );
  }
}
