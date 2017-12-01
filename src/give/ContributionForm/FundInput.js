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
  };

  static defaultProps = {
    funds: [],
    isFirst: false,
  };

  state = {
    targetFundId: '',
    contributionAmount: '',
  };

  get value() {
    return {
      // eslint-disable-next-line
      contributionAmount: this.contributionAmount,
      targetFundId: this.targetFundId,
    };
  }

  get contributionAmount() {
    return parseFloat(this.state.contributionAmount.match(/[\d\.]+/)) || 0;
  }

  get targetFundId() {
    const {
      targetFundId,
    } = this.state;

    return isBlank(targetFundId) ? this.props.funds[0].id : targetFundId;
  }

  setContributionAmount = (value) => {
    const contributionAmount = value.replace(/[^0-9.]/g, '');

    this.setState({
      contributionAmount,
    });
  }

  setTargetFund = (targetFundId, idx) => {
    const { id } = this.props.funds[idx];
    this.setState({ targetFundId: id });
  }

  render() {
    console.log(this.value);
    return (
      <View>
        <Text>{this.props.isFirst ? 'I\'d like to give' : 'and give'}</Text>
        <TextInput
          placeholder="0.00"
          onChangeText={this.setContributionAmount}
          value={this.state.contributionAmount}
        />
        <Text>{'to'}</Text>
        <Picker
          onValueChange={this.setTargetFund}
          selectedValue={this.state.targetFundId}
        >
          {this.props.funds.map(({ name, id }) => (
            <Picker.Item label={name} value={id} key={id} />
          ))}
        </Picker>
      </View>
    );
  }
}
