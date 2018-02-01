import React, { PureComponent } from 'react';
import {
  View, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { groupBy, map } from 'lodash';
import HistoricalContributionCard from '@ui/HistoricalContributionCard';
import FlatList from '@ui/WebCompatibleFlatList';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import ActivityIndicator from '@ui/ActivityIndicator';
import { BodyText } from '@ui/typography';
import { ButtonLink } from '@ui/Button';
import ContributionHistoryHeader from './ContributionHistoryHeader';
import ContributionHistoryFilter from './ContributionHistoryFilter';

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
    FilterComponent: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {
    transactions: [],
    fetchMore() {},
    refetch() {},
    isLoading: true,
    onPressNoDataButton() {},
    FilterComponent: ContributionHistoryFilter,
  };

  renderItem = ({ item }) => (
    <View>
      <ContributionHistoryHeader year={item.year} />
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
    let Header = (
      <View>
        <this.props.FilterComponent />
      </View>
    );
    if (transactionsPerYear.length === 0) {
      Header = (
        <View>
          <this.props.FilterComponent />
          <PaddedView>
            <BodyText>
              {'We didn\'t find any contributions associated with your account. If you would like to start giving, you can '}
              <ButtonLink onPress={this.props.onPressNoDataButton}>
                {'give now'}
              </ButtonLink>
              {'.'}
            </BodyText>
          </PaddedView>
          <PaddedView>
            <BodyText>
              If you have any questions, please call our Finance Team at 864-965-9990 or
              <ButtonLink onPress={() => Linking.openURL('https://newspring.cc/contact')}> contact us </ButtonLink>
              and someone will be happy to assist you.
            </BodyText>
          </PaddedView>
        </View>
      );
    }

    // TODO: this should probably be refactored to use a SectionList eventually.
    // However, SectionList isn't supported on react-native-web, and writing a polyfill
    // would add more debt then worth
    return (
      <FlatList
        refreshing={this.props.isLoading}
        onRefresh={this.props.refetch}
        onEndReached={this.props.fetchMore}
        data={transactionsPerYear}
        renderItem={this.renderItem}
        numColumns={1}
        onEndReachedThreshold={0.7}
        ListHeaderComponent={Header}
        keyExtractor={({ year }) => year}
      />
    );
  }
}

export default ContributionHistoryList;
