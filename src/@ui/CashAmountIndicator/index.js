import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styled from '@ui/styled';
import { H1, H2, H3, H4, H5, H6, H7, H7bold } from '@ui/typography';

const Typography = {
  StyledH1: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H1),

  StyledH2: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H2),

  StyledH3: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H3),

  StyledH4: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H4),

  StyledH5: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H5),

  StyledH6: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H6),

  StyledH7: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H7),

  StyledH7bold: styled(({ theme }) => ({
    color: theme.colors.text.primary,
  }))(H7bold),
};

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

function CashAmountIndicator(props) {
  const amountParts = parseFloat(props.amount)
    .toFixed(2)
    .split('.');
  let sizeString = `StyledH${props.size + 2}`;
  if (props.size + 2 === 7) {
    sizeString = 'StyledH7bold';
  }
  const SmallType = Typography[sizeString];
  const LargeType = Typography[`StyledH${props.size}`];
  const styleOverride = props.color ? { color: props.color } : undefined;
  return (
    <Row>
      <SmallType style={styleOverride}>{'$'}</SmallType>
      <LargeType style={styleOverride}>{amountParts[0]}</LargeType>
      <SmallType style={styleOverride}>{`.${amountParts[1]}`}</SmallType>
    </Row>
  );
}

CashAmountIndicator.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size(props, propName, componentName) {
    if (props[propName] > 5) {
      return new Error(`${componentName} ${propName} prop cannot be greater than 5`);
    }
    return null;
  },
  color: PropTypes.string,
};

CashAmountIndicator.defaultProps = {
  amount: 0,
  size: 1,
};

export default CashAmountIndicator;
