/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import {
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import get from 'lodash/get';
import ActivityIndicator from '@ui/ActivityIndicator';
import { withRouter } from '@ui/NativeWebRouter';
import { UIText } from '@ui/typography';
import Header from '@ui/Header';
import AccountCard from '@ui/AccountCard';
import ScheduleCard from '@ui/ScheduleCard';
import TransactionCard from '@ui/TransactionCard';
import ExpiringAccountCard from '@ui/ExpiringAccountCard';
import FlexedView from '@ui/FlexedView';
import DashboardSubheader from '@ui/DashboardSubheader';
import withGivingDashboard from '@data/withGivingDashboard';
import styled from '@ui/styled';

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

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
          <Row>
            <TouchableWithoutFeedback
              onPress={() => this.props.history.push('/give')}
            >
              <UIText>{'Dashboard'}</UIText>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.history.push('/give/now')}
            >
              <UIText>{'Give'}</UIText>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.history.push('/give/history')}
            >
              <UIText>{'History'}</UIText>
            </TouchableWithoutFeedback>
          </Row>

          <DashboardSubheader
            text="Activity"
            buttonText="See All"
            onPress={() => console.log('go to history')}
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
                expirationDate={`${activityItem.expirationMonth}/1/${activityItem.expirationYear}`}
                onPress={() => { console.log('route to /give/now'); }}
              />
            );
          })}
          <UIText>{'Contributions Graph'}</UIText>

          <DashboardSubheader
            text="Active Schedules"
            buttonText="New Schedule"
            onPress={() => console.log('go to give/now')}
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
              onPress={() => this.props.history.push(`/give/payment-methods/${paymentMethod.id}`)}
            >
              <AccountCard
                key={paymentMethod.id}
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
