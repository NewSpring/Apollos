import React from 'react';
import { compose, mapProps } from 'recompose';
import withFinancialAccounts from '@data/withFinancialAccounts';
import { RelatedContentWithoutData } from '@ui/RelatedContent';
import { H4 } from '@ui/typography';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';

import FundCard from './FundCard';

const Title = styled(({ theme }) => ({ textAlign: 'center', color: theme.colors.text.tertiary }))(H4);

const Funds = compose(
  withFinancialAccounts,
  mapProps(({ accounts, ...otherProps }) => ({
    ...otherProps,
    content: accounts,
    sectionTitle: <PaddedView><Title>Learn more about our campaigns</Title></PaddedView>,
    renderItem: FundCard,
  })),
)(RelatedContentWithoutData);

export default Funds;
