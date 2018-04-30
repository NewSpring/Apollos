import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import moment from 'moment';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card from '@ui/Card';
import PaddedView from '@ui/PaddedView';
import { H6 } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import Spacer from '@ui/Spacer';
import Touchable from '@ui/Touchable';
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
    iconSize: otherProps.iconSize || theme.helpers.rem(1.6),
    iconColor: theme.colors.primary,
    isErrorColor: theme.colors.alert,
  })),
  pure,
);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.link,
}))(H6);

const DateText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.link,
}))(Icon);

const TransactionCard = enhance(
  ({
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
    iconColor,
    ...otherProps
  }) => {
    const isOk =
      status === null ||
      status === 'Success' ||
      status === 'Complete' ||
      status === 'Pending' ||
      status === 'Pendingsettlement';
    return (
      <Card isLoading={isLoading} {...otherProps}>
        <Touchable onPress={onPress}>
          <PaddedView>
            <Row>
              {isOk ? (
                <Icon name="circle-outline-check-mark" fill={iconColor} size={iconSize} />
              ) : (
                <Icon name="circle-outline-x-mark" size={iconSize} fill={isErrorColor} />
              )}
              <Spacer byWidth />
              <DateText>
                {moment(date)
                  .utc()
                  .format(dateFormat)}
              </DateText>
            </Row>
            <Spacer />
            <StatusMessage
              status={status}
              details={details}
              isScheduled={isScheduled}
              error={error}
            />
            <Spacer />
            <Row>
              <StyledH6>{'View Contribution'}</StyledH6>
              <StyledIcon name="arrow-next" size={iconSize} />
            </Row>
          </PaddedView>
        </Touchable>
      </Card>
    );
  },
);

export default TransactionCard;
