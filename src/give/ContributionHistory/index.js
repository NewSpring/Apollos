import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
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
    setFilterDateRange: PropTypes.func,
  };

  static defaultProps = {
    fetchMore: ContributionHistoryList.defaultProps.fetchMore,
    isLoading: ContributionHistoryList.defaultProps.isLoading,
    refetch: ContributionHistoryList.defaultProps.refetch,
    transactions: ContributionHistoryList.defaultProps.transactions,
    onPressNoDataButton: ContributionHistoryList.defaultProps.onPressNoDataButton,
    setFilterDateRange() {},
  };

  handleFilter = ({ startDate, endDate } = {}) => {
    this.props.setFilterDateRange({
      startDate,
      endDate,
    });
  }

  render() {
    return (
      <BackgroundView>
        <ContributionHistoryFilter
          onSubmit={this.handleFilter}
        />
        <ContributionHistoryList
          fetchMore={this.props.fetchMore}
          isLoading={this.props.isLoading}
          refetch={this.props.refetch}
          transactions={this.props.transactions}
          onPressNoDataButton={this.props.onPressNoDataButton}
        />
      </BackgroundView>
    );
  }
}

const enhance = compose(
  withTransactions,
  withProps(props => ({
    onPressNoDataButton() { props.route.jumpTo('Now'); },
  })),
);

export default enhance(ContributionHistory);
