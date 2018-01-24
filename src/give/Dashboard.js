/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import get from 'lodash/get';
import ActivityIndicator from '@ui/ActivityIndicator';
import { withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import AccountCard from '@ui/AccountCard';
import ScheduleCard from '@ui/ScheduleCard';
import TransactionCard from '@ui/TransactionCard';
import ExpiringAccountCard from '@ui/ExpiringAccountCard';
import FlexedView from '@ui/FlexedView';
import DashboardSubheader from '@ui/DashboardSubheader';
import ContributionsChartCard from '@ui/ContributionsChartCard';
import withGivingDashboard from '@data/withGivingDashboard';
import GiveNavigator from '@ui/TmpGiveNavigator';

export class Dashboard extends PureComponent {
  static propTypes = {
    savedPaymentMethods: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      name: PropTypes.string,
      paymentMethod: PropTypes.oneOf(['bankAccount', 'creditCard']),
      accountNumber: PropTypes.string,
    })),
    activityItems: PropTypes.arrayOf(PropTypes.shape({})), // One of many :'(
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    scheduledTransactions: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    savedPaymentMethods: [],
    activityItems: [],
    scheduledTransactions: [],
  };

  render() {
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <ScrollView>
          <GiveNavigator />

          <DashboardSubheader
            text="Activity"
            buttonText="See All"
            onPress={() => this.props.history.push('/give/history')}
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
                  onPress={() => { console.log('route to', activityItem.id); }}
                />
              );
            }
            return (
              <ExpiringAccountCard
                key={activityItem.id}
                name={activityItem.name}
                expirationDate={`${activityItem.expirationMonth}/${activityItem.expirationYear}`}
                onPress={() => this.props.history.push('/give/now')}
              />
            );
          })}
          <ContributionsChartCard />

          <DashboardSubheader
            text="Active Schedules"
            buttonText="New Schedule"
            onPress={() => this.props.history.push('/give/now')}
          />
          {this.props.scheduledTransactions.map(scheduledTransaction => (
            <ScheduleCard
              key={scheduledTransaction.id}
              accountName={get(scheduledTransaction, 'details.0.account.name')}
              amount={get(scheduledTransaction, 'details.0.amount')}
              frequency={get(scheduledTransaction, 'schedule.description')}
              startDate={get(scheduledTransaction, 'start')}
              onPress={() => { console.log('route to', scheduledTransaction.id); }}
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
      </FlexedView>
    );
  }
}

// TODO: Split withGivingDashboard, add edit name and delete mutations
const enhance = compose(
  withGivingDashboard,
  withRouter,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

export default enhance(Dashboard);
