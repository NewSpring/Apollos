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
import { H5, H6, H3, H1, UIText } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    accountName: PropTypes.string,
    amount: PropTypes.string,
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

const StyledH1 = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(H1);

const ItalicText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontStyle: 'italic',
}))(UIText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const Spacer = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
}))(View);

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
}) => {
  const amountParts = amount.toFixed(2).split('.');
  return (
    <Card isLoading={isLoading} {...otherProps}>
      <PaddedView>
        <Row>
          <H3>{'$'}</H3>
          <StyledH1>{amountParts[0]}</StyledH1>
          <H3>{`.${amountParts[1]}`}</H3>
        </Row>
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
  );
});

export default ScheduleCard;
