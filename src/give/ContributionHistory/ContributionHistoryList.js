import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import { map, groupBy } from 'lodash';
import ActivityIndicator from '@ui/ActivityIndicator';
import HistoricalContributionCard from '@ui/HistoricalContributionCard';
import withTransactions from '@data/withTransactions';
import ContributionHistoryHeader from './ContributionHistoryHeader';

class ContributionHistoryList extends PureComponent {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
      year: PropTypes.number,
      date: PropTypes.string,
      person: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        photo: PropTypes.string,
      }),
      details: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        amount: PropTypes.number,
        account: PropTypes.shape({
          name: PropTypes.string,
        }),
      })),
    })),
  };

  static defaultProps = {
    transactions: [],
  };

  render() {
    const transactionsPerYear = groupBy(this.props.transactions, 'year');
    return (
      <View>
        {map(transactionsPerYear, (groupedTransactions, year) => (
          <View>
            <ContributionHistoryHeader>{year}</ContributionHistoryHeader>
            {groupedTransactions.map(transaction => (
              <View>
                {transaction.details.map(detail => (
                  <HistoricalContributionCard
                    key={detail.id}
                    amount={detail.amount}
                    fundName={detail.account.name}
                    contributorName={`${transaction.person.firstName} ${transaction.person.lastName}`}
                    date={transaction.date}
                    profileImageUrl={transaction.person.photo}
                  />
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const enhance = compose(
  withTransactions,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

export default enhance(ContributionHistoryList);
