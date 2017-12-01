import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import ActivityIndicator from '@primitives/ActivityIndicator';
import { H3, BodyCopy as P } from '@primitives/typography';
import withFinancialAccounts from '@data/withFinancialAccounts';
import FundInput from './FundInput';
import FrequencyInput from './FrequencyInput';

export class ContributionForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isOffline: PropTypes.bool,
    funds: FundInput.propTypes.funds,
    offlineContactEmail: PropTypes.string,
    offlineMessageBody: PropTypes.string,
    offlineMessageTitle: PropTypes.string,
  };

  static defaultProps = {
    funds: [],
    isLoading: true,
    isOffline: false,
    offlineContactEmail: '',
    offlineMessageTitle: 'Unfortunately our giving service is offline.',
    offlineMessageBody: 'We are working to resolve this as fast as possible. We are sorry for any inconvience this may have caused.',
  };

  get formValues() {
    return {
      // eslint-disable-next-line
      contributionAmount: parseFloat(this.state.contributionAmount.match(/[\d\.]+/)),
      targetFundId: this.state.targetFundId,
      frequencyId: this.state.frequencyId,
    };
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

    return (
      <View>
        <FundInput
          funds={this.props.funds}
          isFirst
        />
        <FundInput
          funds={this.props.funds}
        />
        <FrequencyInput />
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
