import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import Picker from '@primitives/Picker';
import ActivityIndicator from '@primitives/ActivityIndicator';
import { H3, BodyCopy as P } from '@primitives/typography';
import withFinancialAccounts from '@data/withFinancialAccounts';

const FREQUENCY_IDS = [
  { label: 'one time', id: 'One-Time' },
  { label: 'every week', id: 'Weekly' },
  { label: 'every two weeks', id: 'Bi-Weekly' },
  { label: 'once a month', id: 'Monthly' },
];

export class ContributionForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isOffline: PropTypes.bool,
    funds: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
    offlineContactEmail: PropTypes.string,
    offlineMessageBody: PropTypes.string,
    offlineMessageTitle: PropTypes.string,
    scheduleFrequencies: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
  };

  static defaultProps = {
    funds: [],
    isLoading: true,
    isOffline: false,
    offlineContactEmail: '',
    offlineMessageTitle: 'Unfortunately our giving service is offline.',
    offlineMessageBody: 'We are working to resolve this as fast as possible. We are sorry for any inconvience this may have caused.',
    scheduleFrequencies: FREQUENCY_IDS,
  };

  state = {
    targetFundId: '',
    contributionAmount: '',
    frequencyId: (this.props.scheduleFrequencies[0] && this.props.scheduleFrequencies[0].id) || '',
  };

  componentDidUpdate() {
    if (!this.state.targetFundId && this.props.funds.length > 0) {
      this.setTargetFund(this.props.funds[0].id);
    }
  }

  get formValues() {
    return {
      // eslint-disable-next-line
      contributionAmount: parseFloat(this.state.contributionAmount.match(/[\d\.]+/)),
      targetFundId: this.state.targetFundId,
      frequencyId: this.state.frequencyId,
    };
  }

  setContributionAmount = (value) => {
    const contributionAmount = value.replace(/[^0-9.]/g, '');

    this.setState({
      contributionAmount,
    });
  }

  setTargetFund = (targetFundId) => {
    this.setState({ targetFundId });
  }

  setFrequency = (frequencyId) => {
    this.setState({ frequencyId });
  }

  renderOfflineMessage() {
    return (
      <View>
        <H3>{this.props.offlineMessageTitle}</H3>
        <P>{this.props.offlineMessageBody}</P>
        <P>{`We appreciate your patience. If you have any questions please contact us at ${this.props.offlineContactEmail}`}</P>
      </View>
    );
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;
    if (this.props.funds.length === 0) return <Text>{'There are no funds to contribute to!'}</Text>;
    if (this.props.isOffline) return this.renderOfflineMessage();

    console.log(this.state);
    return (
      <View>
        <Text>{'Give'}</Text>
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
        <Text>{'frequency'}</Text>
        <Picker
          onValueChange={this.setFrequency}
          selectedValue={this.state.frequencyId}
        >
          {this.props.scheduleFrequencies.map(({ label, id }) => (
            <Picker.Item label={label} value={id} key={id} />
          ))}
        </Picker>
      </View>
    );
  }
}

const enhance = compose(
  withFinancialAccounts,
  mapProps(props => ({
    ...props,
    funds: props.accounts,
    isLoading: props.isLoading,
  })),
);

export default enhance(ContributionForm);
