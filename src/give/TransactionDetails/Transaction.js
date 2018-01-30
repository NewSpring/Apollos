import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import moment from 'moment';
import withTransaction from '@data/withTransaction';
import styled from '@ui/styled';
import { UIText, H6, H4 } from '@ui/typography';
import ActivityIndicator from '@ui/ActivityIndicator';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';
import Spacer from '@ui/Spacer';
import { withTheme } from '@ui/theme';

import TransactionDetail from './TransactionDetail';

const ItalicText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontStyle: 'italic',
  textAlign: 'center',
}))(UIText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
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

class Transaction extends PureComponent {
  static propTypes = {
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

  static defaultProps = {
    isLoading: false,
    date: '',
    contributorName: '',
    paymentMethodNumber: '',
    paymentMethod: 'creditCard',
    transactionDetails: [],
  };

  render() {
    if (this.props.isLoading) {
      return (
        <StyledActivityIndicatorContainer>
          <ActivityIndicator />
        </StyledActivityIndicatorContainer>
      );
    }

    return (
      <View>
        <ItalicText>{this.props.date}</ItalicText>
        <Spacer />

        {/* NOTE: A transaction can have multiple funds, this was not reflected in Holtzman */}
        {this.props.transactionDetails.map(detail => (
          <TransactionDetail
            key={detail.id}
            fundName={detail.fundName}
            amount={detail.amount}
          />
        ))}

        <Row>
          <StyledH4>{last4(this.props.paymentMethodNumber)}</StyledH4>
          <Spacer byWidth />
          <StyledIcon
            name={this.props.paymentMethod === 'bankAccount' ? 'bank' : 'credit'}
          />
        </Row>
        <StyledH6>{this.props.contributorName}</StyledH6>
      </View>
    );
  }
}

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

export default enhance(Transaction);
