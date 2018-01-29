import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { groupBy, map } from 'lodash';
import HistoricalContributionCard from '@ui/HistoricalContributionCard';
import FlatList from '@ui/WebCompatibleFlatList';
import FlexedView from '@ui/FlexedView';
import ActivityIndicator from '@ui/ActivityIndicator';
import { UIText } from '@ui/typography';
import { ButtonLink } from '@ui/Button';
import ContributionHistoryHeader from './ContributionHistoryHeader';

class ContributionHistoryList extends PureComponent {
  static propTypes = {
    fetchMore: PropTypes.func,
    isLoading: PropTypes.bool,
    refetch: PropTypes.func,
    transactions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      person: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        photo: PropTypes.string,
      }),
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      amount: PropTypes.number,
      account: PropTypes.shape({
        name: PropTypes.string,
      }),
    })),
    onPressNoDataButton: PropTypes.func,
  };

  static defaultProps = {
    transactions: [],
    fetchMore() {},
    refetch() {},
    isLoading: true,
    onPressNoDataButton() {},
  };

  renderItem = ({ item }) => (
    <View>
      <ContributionHistoryHeader>{item.year}</ContributionHistoryHeader>
      {item.transactions.map(transaction => (
        <HistoricalContributionCard
          key={transaction.id}
          amount={transaction.amount}
          fundName={transaction.account.name}
          contributorName={`${transaction.person.firstName} ${transaction.person.lastName}`}
          date={transaction.date}
          profileImageUrl={transaction.person.photo}
        />
      ))}
    </View>
  );

  render() {
    if (this.props.isLoading) {
      return (
        <FlexedView>
          <ActivityIndicator />
        </FlexedView>
      );
    }

    const transactionsPerYear = map(groupBy(this.props.transactions, 'year'), (transactions, year) => ({ year, transactions }));
    if (transactionsPerYear.length === 0) {
      return (
        <UIText>
          {'We didn\'t find any contributions associated with your account. If you would like to start giving, click '}
          <ButtonLink onPress={this.props.onPressNoDataButton}>
            {'here'}
          </ButtonLink>
        </UIText>
      );
    }

    return (
      <FlatList
        refreshing={this.props.isLoading}
        onRefresh={this.props.refetch}
        onEndReached={this.props.fetchMore}
        data={transactionsPerYear}
        renderItem={this.renderItem}
        numColumns={1}
        onEndReachedThreshold={0.7}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default ContributionHistoryList;
