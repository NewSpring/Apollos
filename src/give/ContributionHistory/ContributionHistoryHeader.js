import React from 'react';
import {
  View,
  Platform,
} from 'react-native';
import { compose } from 'recompose';
import { H5 } from '@ui/typography';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import styled from '@ui/styled';
import ContributionHistoryPrintButton from './ContributionHistoryPrintButton';

const Row = compose(
  mediaQuery(({ md }) => ({ minWidth: md }), styled(({ theme }) => ({
    paddingHorizontal: theme.sizing.baseUnit,
  }))),
  styled(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.sizing.baseUnit / 2,
    marginTop: theme.sizing.baseUnit * 2,
    marginBottom: theme.sizing.baseUnit / 2,
  })),
)(View);

const StyledH5 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H5);

export default ({ year } = {}) => (
  <Row>
    <StyledH5>{year}</StyledH5>
    {Platform.OS === 'web' && (
      <ContributionHistoryPrintButton
        year={year}
      />
    )}
  </Row>
);
