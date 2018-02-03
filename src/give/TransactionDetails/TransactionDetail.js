import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withIsLoading } from '@ui/isLoading';
import { H3 } from '@ui/typography';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import styled from '@ui/styled';

const StyledView = styled(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const StyledH3 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H3);

const TransactionDetail = withIsLoading(({
  fundName,
  amount,
}) => (
  <StyledView>
    <StyledH3>{fundName}</StyledH3>
    <CashAmountIndicator amount={amount} />
  </StyledView>
));

TransactionDetail.propTypes = {
  fundName: PropTypes.string,
  amount: PropTypes.number,
};

TransactionDetail.defaultProps = {
  fundName: '',
  amount: 0,
};

export default TransactionDetail;
