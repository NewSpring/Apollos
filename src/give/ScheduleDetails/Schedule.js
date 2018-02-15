/* eslint-disable */
import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import withScheduledTransaction from '@data/withScheduledTransaction';
import styled from '@ui/styled';
import { H3, H4, H6, H7, BodyText } from '@ui/typography';
import ActivityIndicator from '@ui/ActivityIndicator';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';
import Spacer from '@ui/Spacer';
import { withTheme } from '@ui/theme';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import PaddedView from '@ui/PaddedView';
import FlexedView from '@ui/FlexedView';
import TableView, { Cell, CellText, Divider } from '@ui/TableView';
import { withIsLoading } from '@ui/isLoading';

import TransactionDetail from '../TransactionDetail';
import CancelScheduleButton from './CancelScheduleButton';

import Transaction from '../TransactionDetails/Transaction';
import ScheduleTransactionHistory from './ScheduleTransactionHistory';

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(View);

const Note = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
  paddingBottom: theme.sizing.baseUnit,
  textAlign: 'center',
  color: theme.colors.text.secondary,
}))(BodyText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const StyledH6 = styled(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.text.tertiary,
}))(H6);

const StyledH4 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H4);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.secondary,
}))(Icon);

const StyledActivityIndicatorContainer = styled({
  height: 40,
})(View);

const CenteredView = styled({
  alignItems: 'center',
})(PaddedView);

const Label = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H7);

const enhance = compose(
  withScheduledTransaction,
  withProps(props => ({
    transactionId: get(props, 'transaction.transactionId'),
    isActive: get(props, 'transaction.isActive'),
    isComplete: new Date(get(props, 'transaction.next')) < new Date() && get(props, 'transaction.schedule.value') === "One-Time",
  })),
  withIsLoading,
);

const Schedule = enhance(({
  isComplete,
  isActive,
  transactionId,
  transaction = {},
  isLoading,
}) => {
  const isCancellable = !isComplete && isActive;

  let details = get(transaction, 'details', []);

  return (
    <View>
      <PaperView>
        <CenteredView>
          <CashAmountIndicator
            amount={details
              .reduce((i, { amount = 0 } = {}) => i + amount, 0).toFixed(2)}
          />
          <H3>{get(transaction, 'schedule.description')}</H3>
          <Row>
            <H4>{last4(get(transaction, 'payment.accountNumber'))}</H4>
            <Spacer byWidth />
            <Icon
              name={get(transaction, 'payment.paymentType') === 'bankAccount' ? 'bank' : 'credit'}
            />
          </Row>
        </CenteredView>

        <TableView>
          {details.map((detail, i) => ([
            <Cell key={get(detail, 'account.name')} style={{ height: null }}>
              <FlexedView>
                <H4>{get(detail, 'account.name')}</H4>
                <Row>
                  <Label>Start date: </Label>
                  <BodyText italic>{moment(transaction.start).utc().format('MM/DD/YYYY')}</BodyText>
                </Row>
              </FlexedView>
              <CashAmountIndicator size={3} amount={detail.amount} />
            </Cell>,
            (i !== details.length - 1) ? <Divider key={`${get(detail, 'account.name')}-divider`} /> : null,
          ]))}
        </TableView>

        <PaddedView>
          {!isActive && (
            <BodyText italic>{'Schedule Inactive'}</BodyText>
          )}
          {isComplete && (
            <BodyText italic>{'Schedule Completed'}</BodyText>
          )}
          {isCancellable && (
            <CancelScheduleButton
              id={transactionId}
            />
          )}
        </PaddedView>

        <PaddedView>
          <Note italic>
            {'To change details about a schedule, please cancel the current one and create a new schedule with the desired information. We are sorry for any inconvenience this may cause and are working to provide the ability to edit contribution schedules in the future.'}
          </Note>
        </PaddedView>
      </PaperView>

      <ScheduleTransactionHistory
        transactions={get(transaction, 'transactions', [])}
        isLoading={isLoading}
      />
    </View>
  );
});

Schedule.propTypes = {
  transactionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Schedule.defaultProps = {
  transactionId: '',
  isLoading: false,
};

export default Schedule;
