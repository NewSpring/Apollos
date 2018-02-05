import React from 'react';
import { View, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopy } from '@ui/typography';
import PaddedView from '@ui/PaddedView';
import Spacer from '@ui/Spacer';
import styled from '@ui/styled';
import { Link } from '@ui/NativeWebRouter';
import HistoricalContributionCard from '@ui/HistoricalContributionCard';

const LinkText = styled(({ theme }) => ({ color: theme.colors.primary }))(BodyCopy);

const ScheduleTransactionHistory = ({
  transactions = [],
  isLoading = false,
}) => (
  <View>
    {!isLoading && !transactions.length ? (
      <PaddedView>
        <BodyCopy>{'We didn\'t find any contributions associated with this schedule.'}</BodyCopy>
        <Spacer byHeight />
        <BodyCopy italic>
          If you have any questions, please call our Finance Team at 864-965-9990 or{' '}
          <LinkText italic onPress={() => Linking.openURL('https://rock.newspring.cc/workflows/152?Topic=Stewardship')}>
            Contact Us
          </LinkText>
          {' '}and someone will be happy to assist you.
        </BodyCopy>
        <Spacer byHeight />
        <BodyCopy italic>
          {'You can print your yearly giving statement in your giving history'}
        </BodyCopy>
      </PaddedView>
    ) : null}
    {transactions.map(transaction => (
      <Link to={`/give/history/${transaction.id}`}>
        <HistoricalContributionCard
          amount={transaction.details.amount}
          fundName={transaction.details.account.name}
          contributorName={`${transaction.person.firstName} ${transaction.person.lastName}`}
          date={transaction.date}
          profileImageUrl={transaction.person.photo}
        />
      </Link>
    ))}
  </View>
);

ScheduleTransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({

  })),
  isLoading: PropTypes.bool,
};

export default ScheduleTransactionHistory;
