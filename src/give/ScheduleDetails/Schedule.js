/* eslint-disable */
import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import withScheduledTransaction from '@data/withScheduledTransaction';
import styled from '@ui/styled';
import { UIText, H6, H4 } from '@ui/typography';
import ActivityIndicator from '@ui/ActivityIndicator';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';
import Spacer from '@ui/Spacer';
import { withTheme } from '@ui/theme';

import ScheduleDetail from './ScheduleDetail';
import CancelScheduleButton from './CancelScheduleButton';

const ItalicText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontStyle: 'italic',
  textAlign: 'center',
}))(UIText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})(View);

const StyledH6 = styled(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.text.tertiary,
}))(H6);

const StyledH4 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H4);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.secondary,
}))(Icon);

const StyledActivityIndicatorContainer = styled({
  height: 40,
})(View);

// TODO: Make this pretty
class Schedule extends PureComponent {
  static propTypes = {
    transactionId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    transactionId: '',
    isLoading: false,
  };

  render() {
    if (this.props.isLoading) {
      return (
        <StyledActivityIndicatorContainer>
          <ActivityIndicator />
        </StyledActivityIndicatorContainer>
      );
    }

    const isCancellable = !this.props.isComplete && this.props.isActive;

    return (
      <View>
        {!this.props.isActive && (
          <ItalicText>{'Schedule Inactive'}</ItalicText>
        )}
        {this.props.isComplete && (
          <ItalicText>{'Schedule Completed'}</ItalicText>
        )}
        {isCancellable && (
          <CancelScheduleButton
            id={this.props.transactionId}
          />
        )}
      </View>
    );
    // return (
    //   <View>
    //     <ItalicText>{this.props.date}</ItalicText>
    //     <Spacer />
    //     <CancelScheduleButton />

    //     {/* NOTE: A transaction can have multiple funds, this was not reflected in Holtzman */}
    //     {this.props.transactionDetails.map(detail => (
    //       <ScheduleDetail
    //         key={detail.id}
    //         fundName={detail.fundName}
    //         amount={detail.amount}
    //       />
    //     ))}

    //     <Row>
    //       <StyledH4>{last4(this.props.paymentMethodNumber)}</StyledH4>
    //       <Spacer byWidth />
    //       <StyledIcon
    //         name={this.props.paymentMethod === 'bankAccount' ? 'bank' : 'credit'}
    //       />
    //     </Row>
    //     <StyledH6>{this.props.contributorName}</StyledH6>
    //   </View>
    // );
  }
}

const enhance = compose(
  withScheduledTransaction,
  withProps(props => ({
    transactionId: get(props, 'transaction.transactionId'),
    isActive: get(props, 'transaction.isActive'),
    isComplete: new Date(get(props, 'transaction.next')) < new Date() && get(props, 'transaction.schedule.value') === "One-Time",
  })),
);

export default enhance(Schedule);
