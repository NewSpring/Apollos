import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import { map, groupBy } from 'lodash';
import ActivityIndicator from '@ui/ActivityIndicator';
import FlexedView from '@ui/FlexedView';
import HistoricalContributionCard from '@ui/HistoricalContributionCard';
import withTransactions from '@data/withTransactions';
import { H5 } from '@ui/typography';

class ContributionHistory extends PureComponent {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    transactions: [],
  };

  render() {
    const transactionsPerYear = groupBy(this.props.transactions, 'year');
    return (
      <FlexedView>
        <ScrollView>
          {map(transactionsPerYear, (groupedTransactions, year) => (
            <View>
              <H5>{year}</H5>
              {groupedTransactions.map(transaction => (
                <View>
                  {transaction.details.map(detail => (
                    <HistoricalContributionCard
                      key={detail.id}
                      amount={detail.amount}
                      fundName={detail.account.name}
                      contributorName={`${transaction.person.firstName} ${transaction.person.lastName}`}
                      date={transaction.date}
                      profileImageUrl="via.placeholder.com/50x50"
                    />
                  ))}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </FlexedView>
    );
  }
}

const enhance = compose(
  withTransactions,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

export default enhance(ContributionHistory);
