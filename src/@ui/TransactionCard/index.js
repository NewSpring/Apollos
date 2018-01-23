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
import { H5, H6 } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import Spacer from '@ui/Spacer';
import StatusMessage from './StatusMessage';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    date: PropTypes.string,
    iconSize: PropTypes.number,
    dateFormat: PropTypes.string,
    status: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.shape({})),
    error: PropTypes.string,
    isScheduled: PropTypes.bool,
  }),
  defaultProps({
    isLoading: false,
    date: null,
    iconSize: null,
    dateFormat: 'MMM D YYYY',
    status: null,
    details: [],
    error: null,
    isScheduled: false,
  }),
  withIsLoading,
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
    isErrorColor: theme.colors.alert,
  })),
  pure,
);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.link,
}))(H6);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const TransactionCard = enhance(({
  isLoading,
  iconSize,
  date,
  dateFormat,
  onPress,
  status,
  details,
  isScheduled,
  error,
  isErrorColor,
  ...otherProps
}) => {
  const isOk = status === null || status === 'Success' || status === 'Complete' || status === 'Pending';
  return (
    <Card isLoading={isLoading} {...otherProps}>
      <PaddedView>
        <Row>
          {isOk ? <Icon name="circle-outline-check-mark" size={iconSize} /> : <Icon name="circle-outline-x-mark" size={iconSize} fill={isErrorColor} />}
          <Spacer byWidth />
          <H5>{moment(date).utc().format(dateFormat)}</H5>
        </Row>
        <Spacer />
        <StatusMessage
          status={status}
          details={details}
          isScheduled={isScheduled}
          error={error}
        />
        <Spacer />
        <TouchableWithoutFeedback
          onPress={onPress}
        >
          <Row>
            <StyledH6>{'View Contribution'}</StyledH6>
            <Icon name="arrow-next" size={iconSize} />
          </Row>
        </TouchableWithoutFeedback>
      </PaddedView>
    </Card>
  );
});

export default TransactionCard;
