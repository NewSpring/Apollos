/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withPropsOnChange, onlyUpdateForKeys } from 'recompose';
import get from 'lodash/get';
import ActivityIndicator from '@ui/ActivityIndicator';
import { withRouter } from '@ui/NativeWebRouter';
import AccountCard from '@ui/AccountCard';
import ScheduleCard from '@ui/ScheduleCard';
import TransactionCard from '@ui/TransactionCard';
import ExpiringAccountCard from '@ui/ExpiringAccountCard';
import BackgroundView from '@ui/BackgroundView';
import DashboardSubheader from '@ui/DashboardSubheader';
import ContributionsChartCard from '@ui/ContributionsChartCard';
import withGivingDashboard from '@data/withGivingDashboard';
import MediaQuery from '@ui/MediaQuery';
import LoginPromptCard from '@ui/LoginPromptCard';

export class Dashboard extends PureComponent {
  static propTypes = {
    savedPaymentMethods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
        paymentMethod: PropTypes.oneOf(['bankAccount', 'creditCard']),
        accountNumber: PropTypes.string,
      }),
    ),
    activityItems: PropTypes.arrayOf(PropTypes.shape({})), // One of many :'(
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    scheduledTransactions: PropTypes.arrayOf(PropTypes.shape({})),
    onPressActivityLink: PropTypes.func,
    onPressExpiringAccountCard: PropTypes.func,
    onPressNewScheduleLink: PropTypes.func,
    onPressTransactionCard: PropTypes.func,
    onPressScheduleCard: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    savedPaymentMethods: [],
    activityItems: [],
    scheduledTransactions: [],
    onPressActivityLink() {},
    onPressExpiringAccountCard() {},
    onPressNewScheduleLink() {},
    onPressTransactionCard() {},
    onPressScheduleCard() {},
    isLoading: false,
  };

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;
    return (
      <BackgroundView>
        <ScrollView>
          <LoginPromptCard prompt="Sign in to see your giving history, schedules, and saved payments." />

          <DashboardSubheader
            text="Activity"
            buttonText="See All"
            onPress={this.props.onPressActivityLink}
          />
          {this.props.activityItems.map((activityItem) => {
            if (activityItem.__typename === 'Transaction') {
              return (
                <TransactionCard
                  key={activityItem.id}
                  date={activityItem.date}
                  status={activityItem.status}
                  details={activityItem.details}
                  isScheduled={activityItem.scheduled}
                  amount={activityItem.amount}
                  error={activityItem.statusMessage}
                  onPress={() => {
                    this.props.onPressTransactionCard(activityItem.id);
                  }}
                />
              );
            }
            return (
              <ExpiringAccountCard
                key={activityItem.id}
                name={activityItem.name}
                expirationDate={`${activityItem.expirationMonth}/${activityItem.expirationYear}`}
                onPress={() => this.props.onPressExpiringAccountCard(activityItem.entityId)}
              />
            );
          })}

          {Platform.OS !== 'web' ? (
            <ContributionsChartCard onPressHistory={this.props.onPressActivityLink} />
          ) : (
            <MediaQuery maxWidth="md">
              <ContributionsChartCard onPressHistory={this.props.onPressActivityLink} />
            </MediaQuery>
          )}

          <DashboardSubheader
            text="Active Schedules"
            buttonText="New Schedule"
            onPress={this.props.onPressNewScheduleLink}
          />
          {this.props.scheduledTransactions.map(scheduledTransaction => (
            <ScheduleCard
              key={scheduledTransaction.id}
              accountName={get(scheduledTransaction, 'details.0.account.name')}
              amount={get(scheduledTransaction, 'details')
                .reduce((i, { amount = 0 } = {}) => i + amount, 0)
                .toFixed(2)}
              frequency={get(scheduledTransaction, 'schedule.description')}
              startDate={get(scheduledTransaction, 'start')}
              onPress={() => {
                this.props.onPressScheduleCard(scheduledTransaction.id);
              }}
            />
          ))}

          <DashboardSubheader
            text="Saved Accounts"
            buttonText="Add Account"
            onPress={() => this.props.history.push('/give/new-payment-method/address')}
          />
          {this.props.savedPaymentMethods.map(paymentMethod => (
            <TouchableWithoutFeedback
              key={paymentMethod.id}
              onPress={() => this.props.history.push(`/give/payment-methods/${paymentMethod.id}`)}
            >
              <AccountCard
                title={paymentMethod.name}
                accountNumber={paymentMethod.accountNumber}
                accountType={paymentMethod.paymentMethod}
              />
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </BackgroundView>
    );
  }
}

// TODO: Split withGivingDashboard, add edit name and delete mutations
const enhance = compose(
  withGivingDashboard,
  withRouter,
  onlyUpdateForKeys(['isLoading', 'scheduledTransactions', 'activityItems', 'savedPaymentMethods']),
  withPropsOnChange(['route', 'history'], props => ({
    onPressActivityLink() {
      props.route.jumpTo('ContributionHistory');
    },
    onPressExpiringAccountCard(id) {
      props.history.push(`/give/payment-methods/${id}`);
    },
    onPressNewScheduleLink() {
      props.route.jumpTo('Now');
    },
    onPressTransactionCard(id) {
      props.history.push(`/give/history/${id}`);
    },
    onPressScheduleCard(id) {
      props.history.push(`/give/schedules/${id}`);
    },
  })),
);

export default enhance(Dashboard);
