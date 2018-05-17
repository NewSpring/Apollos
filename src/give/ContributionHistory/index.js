import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, onlyUpdateForKeys } from 'recompose';
import { withRouter } from '@ui/NativeWebRouter';
import BackgroundView from '@ui/BackgroundView';
import withTransactions from '@data/withTransactions';
import ContributionHistoryList from './ContributionHistoryList';
import ContributionHistoryFilter from './ContributionHistoryFilter';

class ContributionHistory extends PureComponent {
  static propTypes = {
    fetchMore: ContributionHistoryList.propTypes.fetchMore,
    isLoading: ContributionHistoryList.propTypes.isLoading,
    refetch: ContributionHistoryList.propTypes.refetch,
    transactions: ContributionHistoryList.propTypes.transactions,
    onPressNoDataButton: ContributionHistoryList.propTypes.onPressNoDataButton,
    onPressContributionCard: ContributionHistoryList.propTypes.onPressContributionCard,
    setFilterDateRange: PropTypes.func,
    dateRange: PropTypes.shape({
      stateDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
  };

  static defaultProps = {
    fetchMore: ContributionHistoryList.defaultProps.fetchMore,
    isLoading: ContributionHistoryList.defaultProps.isLoading,
    refetch: ContributionHistoryList.defaultProps.refetch,
    transactions: ContributionHistoryList.defaultProps.transactions,
    onPressNoDataButton: ContributionHistoryList.defaultProps.onPressNoDataButton,
    onPressContributionCard: ContributionHistoryList.defaultProps.onPressContributionCard,
    setFilterDateRange() {},
  };

  handleFilter = ({ startDate, endDate } = {}) => {
    this.props.setFilterDateRange({
      startDate,
      endDate,
    });
  };

  render() {
    return (
      <BackgroundView>
        <ContributionHistoryList
          fetchMore={this.props.fetchMore}
          isLoading={this.props.isLoading}
          refetch={this.props.refetch}
          transactions={this.props.transactions}
          onPressNoDataButton={this.props.onPressNoDataButton}
          onPressContributionCard={this.props.onPressContributionCard}
          FilterComponent={() => (
            <ContributionHistoryFilter {...this.props.dateRange} onSubmit={this.handleFilter} />
          )}
        />
      </BackgroundView>
    );
  }
}

const enhance = compose(
  withRouter,
  onlyUpdateForKeys([]),
  withProps(props => ({
    onPressContributionCard(id) {
      props.history.push(`/give/history/${id}`);
    },
  })),
  withTransactions,
  withProps(props => ({
    onPressNoDataButton() {
      props.route.jumpTo('Now');
    },
  })),
);

export default enhance(ContributionHistory);
