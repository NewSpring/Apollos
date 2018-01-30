import React, { PureComponent } from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import moment from 'moment';
import { withRouter } from '@ui/NativeWebRouter';
import withTransaction from '@data/withTransaction';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import styled from '@ui/styled';
import { UIText, H6, H4 } from '@ui/typography';
import ActivityIndicator from '@ui/ActivityIndicator';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';

import TransactionDetail from './TransactionDetail';

const ItalicText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontStyle: 'italic',
}))(UIText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
}), 'BackgroundView')(View);

class TransactionDetails extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    goBack: PropTypes.func,
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
    goBack() {},
    date: '',
    contributorName: '',
    paymentMethodNumber: '',
    paymentMethod: 'creditCard',
    transactionDetails: [],
  };

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <PaperView>
          <Header
            titleText="Transaction"
            backButton
          />

          <TouchableWithoutFeedback
            onPress={this.props.goBack}
          >
            <Row>
              <Icon name="arrow-back" />
              <UIText>{'Back'}</UIText>
            </Row>
          </TouchableWithoutFeedback>

          <ItalicText>{this.props.date}</ItalicText>
          <H6>{this.props.contributorName}</H6>
          <Row>
            <H4>{last4(this.props.paymentMethodNumber)}</H4>
            <Icon
              name={this.props.paymentMethod === 'bankAccount' ? 'bank' : 'credit'}
            />
          </Row>

          {/* NOTE: A transaction can have multiple funds, this was not reflected in Holtzman */}
          {this.props.transactionDetails.map(detail => (
            <TransactionDetail
              key={detail.id}
              fundName={detail.fundName}
              amount={detail.amount}
            />
          ))}
          <UIText>
            {'Thank you for your contribution to NewSpring Church. Because you are obedient in giving, we\'ll be able to connect more people to Jesus and each other.'}
          </UIText>
        </PaperView>
        <BackgroundView />
      </View>
    );
  }
}

const enhance = compose(
  withRouter,
  withProps(props => ({
    id: get(props, 'match.params.id'),
    goBack() {
      props.history.goBack();
    },
  })),
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

export default enhance(TransactionDetails);
