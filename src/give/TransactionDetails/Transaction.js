import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import moment from 'moment';
import withTransaction from '@data/withTransaction';
import styled from '@ui/styled';
import { BodyText, H6, H4 } from '@ui/typography';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';
import Spacer from '@ui/Spacer';
import { withTheme } from '@ui/theme';
import ActivityIndicator from '@ui/ActivityIndicator';

import TransactionDetail from '../TransactionDetail';

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})(View);

const DateText = styled({
  textAlign: 'center',
})(BodyText);

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

const enhance = compose(
  withTransaction,
  withProps(props => ({
    date: moment(get(props, 'transaction.date')).utc().format('MMM DD, YYYY'),
    contributorName: `${get(props, 'transaction.person.nickName') || get(props, 'transaction.person.firstName', '')} ${get(props, 'transaction.person.lastName', '')}`,
    paymentMethodNumber: get(props, 'transaction.payment.accountNumber', ''),
    paymentMethod: get(props, 'transaction.payment.paymentMethod'),
    transactionDetails: get(props, 'transaction.details', []).map(detail => ({
      ...detail,
      fundName: detail.account.name,
    })),
  })),
);

const Transaction = enhance(({
  date,
  transactionDetails,
  contributorName,
  paymentMethodNumber,
  paymentMethod,
  isLoading,
}) => (
  <View>
    <DateText italic isLoading={isLoading}>{date}</DateText>
    <Spacer />

    {isLoading ? <ActivityIndicator /> : null}
    {transactionDetails.map(detail => (
      <TransactionDetail key={detail.id} {...detail} />
    ))}

    <StyledH6>{contributorName}</StyledH6>

    <Row>
      <StyledH4>{last4(paymentMethodNumber)}</StyledH4>
      <Spacer byWidth />
      <StyledIcon
        name={paymentMethod === 'bankAccount' ? 'bank' : 'credit'}
      />
    </Row>
  </View>
));

Transaction.propTypes = {
  isLoading: PropTypes.bool,
  date: PropTypes.string,
  contributorName: PropTypes.string,
  paymentMethodNumber: PropTypes.string,
  paymentMethod: PropTypes.oneOf(['bankAccount', 'creditCard']),
  transactionDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    fundName: PropTypes.string,
    amount: PropTypes.number,
  })),
};

Transaction.defaultProps = {
  isLoading: false,
  date: '',
  contributorName: '',
  paymentMethodNumber: '',
  paymentMethod: 'creditCard',
  transactionDetails: [],
};


export default Transaction;
