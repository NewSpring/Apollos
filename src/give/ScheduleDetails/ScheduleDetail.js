import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
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

export default class ScheduleDetail extends PureComponent {
  static propTypes = {
    fundName: PropTypes.string,
    amount: PropTypes.number,
  };

  static defaultProps = {
    fundName: '',
    amount: 0,
  };

  render() {
    return (
      <StyledView>
        <StyledH3>{this.props.fundName}</StyledH3>
        <CashAmountIndicator
          amount={this.props.amount}
        />
      </StyledView>
    );
  }
}
