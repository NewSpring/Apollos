import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import moment from 'moment';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card from '@ui/Card';
import PaddedView from '@ui/PaddedView';
import { H5, H6, UIText } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import Spacer from '@ui/Spacer';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    accountName: PropTypes.string,
    amount: PropTypes.number,
    frequency: PropTypes.string,
    startDate: PropTypes.string,
    iconSize: PropTypes.number,
    dateFormat: PropTypes.string,
  }),
  defaultProps({
    isLoading: false,
    accountName: null,
    amount: 0,
    frequency: null,
    startDate: null,
    iconSize: null,
    dateFormat: 'MMM D YYYY',
  }),
  withIsLoading,
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
  })),
  pure,
);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.link,
}))(H6);

const ItalicText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontStyle: 'italic',
}))(UIText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const ScheduleCard = enhance(({
  isLoading,
  accountName,
  amount,
  frequency,
  startDate,
  iconSize,
  dateFormat,
  onPress,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <PaddedView>
      <CashAmountIndicator
        amount={amount}
      />
      <H5>{frequency}</H5>
      <H5>{accountName}</H5>
      <Spacer />
      <Row>
        <UIText>{'Start Date: '}</UIText>
        <ItalicText>{moment(startDate).format(dateFormat)}</ItalicText>
      </Row>
      <Spacer />
      <TouchableWithoutFeedback
        onPress={onPress}
      >
        <Row>
          <StyledH6>{'View Schedule Details'}</StyledH6>
          <Icon name="ArrowNext" size={iconSize} />
        </Row>
      </TouchableWithoutFeedback>
    </PaddedView>
  </Card>
));

export default ScheduleCard;
